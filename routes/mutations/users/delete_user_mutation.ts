import { publicProcedure, loggerMiddleware } from '../../../trpc';
import {date, z} from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../../db'
import { Prisma } from '@prisma/client'

const ee = new EventEmitter();

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
