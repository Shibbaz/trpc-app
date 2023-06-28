import { observable } from '@trpc/server/observable';
import { publicProcedure } from '../../trpc';
import { z } from 'zod'
import { prisma } from '../../db'

export const onUpdateUserSubscription = publicProcedure.input(
    z.object({
        id: z.number().nullish(),
    })
).subscription(({input}:any)=> {
    return observable<{data: any}>((emit) => {
        const id = input.id
        const user = prisma.user.findUnique({
            where: input,
          })
        emit.next({data: {
            id: id
        }});
    }
    )
})
