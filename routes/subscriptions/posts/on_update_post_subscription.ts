import { observable } from '@trpc/server/observable';
import { Procedure } from '../../../libs/config/initializers/trpc';
import { z } from 'zod'
import { prisma } from '../../../libs/config/initializers/database'

export const onUpdatePostSubscription = Procedure.input(
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
