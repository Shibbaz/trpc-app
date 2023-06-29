import { publicProcedure, loggerMiddleware } from '../../../trpc';
import {date, z} from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../../db'

const ee = new EventEmitter();

export const createPostMutation = publicProcedure.use(loggerMiddleware).input(
    z.object({
        title: z.string(),
        description: z.string().nullish(),
        authorId: z.number()
    })
).mutation(async ({ input }:any) => {
    const post = prisma.post.create({
        data: input || undefined,
    })
    return await prisma.$transaction([post])
}
)