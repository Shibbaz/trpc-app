import { publicProcedure, loggerMiddleware } from '../../trpc';
import {date, z} from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../db'
import { Prisma } from '@prisma/client'

const ee = new EventEmitter();
export const updateUserMutation = publicProcedure.use(loggerMiddleware).input(
    z.object({
        id: z.number(),
        name: z.string().nullish(),
    })
).mutation(async({ input }:any) => {
    ee.emit('change', {name: input.name});
    const user = prisma.user.update({
        data: input || undefined,
        where: {
            id: input.id
        },
        select: {
            age: true,
            name: true,
          },
    })
    return await prisma.$transaction([user])
})

export const createUserMutation = publicProcedure.use(loggerMiddleware).input(
    z.object({
        name: z.string().nullish(),
        age: z.number().nullish()
    })
).mutation(async ({ input }:any) => {
    const user = prisma.user.create({
        data: input || undefined,
    })
    return await prisma.$transaction([user])
}
)

export const deleteUserMutation = publicProcedure.use(loggerMiddleware).input(
    z.object({
        id: z.number(),
    })
).mutation(async({ input }:any) => {
    const user = prisma.user.delete({
        where: {
            id: input.id
        },
    })
    return await prisma.$transaction([user])
})
