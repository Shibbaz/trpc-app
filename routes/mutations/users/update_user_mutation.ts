import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z} from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../../db'

const ee = new EventEmitter();
export const updateUserMutation = publicProcedure.use(loggerMiddleware).input(
    z.object({
        id: z.number(),
        name: z.string().nullish(),
        age: z.number().nullish()
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