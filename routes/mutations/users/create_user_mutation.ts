import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z} from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../../db'

const ee = new EventEmitter();

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