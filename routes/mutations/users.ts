import { publicProcedure } from '../../trpc';
import {date, z} from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../db'

const ee = new EventEmitter();
export const updateUser = publicProcedure.input(
    z.object({
        id: z.number(),
        name: z.string().nullish(),
    })
).mutation(async({ input }:any) => {
    ee.emit('change', {name: input.name});
    return await prisma.user.update({
        data: input || undefined,
        where: {
            id: input.id
        },
        select: {
            age: true,
            name: true,
          },
    })
})

export const createUserMutation = publicProcedure.input(
    z.object({
        name: z.string().nullish(),
        age: z.number().nullish()
    })
).mutation(async ({ input }:any) => {
        return await prisma.user.create({
            data: input || undefined,
        })
    }
)