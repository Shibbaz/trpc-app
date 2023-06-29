import { observable } from '@trpc/server/observable';
import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z } from 'zod'
import { prisma } from '../../../db'

export const onUpdatePostSubscription = publicProcedure.use(loggerMiddleware).input(
    z.object({
        id: z.number().nullish(),
    })
).subscription(({input}:any)=> {
    return observable<{data: any}>((emit) => {
        const post = prisma.post.findUnique({
            where: input,
          })
        emit.next({data: {
            id: input.id,
        }});
    }
    )
})
