import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z } from 'zod'
import { EventEmitter } from 'events';
import { prisma } from '../../../db'

const ee = new EventEmitter();

export const updatePostMutation = publicProcedure.use(loggerMiddleware).input(
    z.object({
        id: z.number(),
        title: z.string().nullish(),
        description: z.string().nullish(),
    })
).mutation(async({ input }:any) => {
    ee.emit('change', {id: input.id});
    const post = prisma.post.update({
        data: input || undefined,
        where: {
            id: input.id
        },
        select: {
            id: true,
            description: true,
            title: true
          },
    })
    return await prisma.$transaction([post])
})