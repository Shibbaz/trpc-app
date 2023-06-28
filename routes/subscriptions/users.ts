import { observable } from '@trpc/server/observable';
import { publicProcedure } from '../../trpc';
import { usersDataSource } from '../../models/users/dataSource'
import { z } from 'zod'

export const onUpdateUserSubscription = publicProcedure.input(
    z.object({
        id: z.number().nullish(),
    })
).subscription(({input}:any)=> {
    return observable<{data: any}>((emit) => {
        const id = input.id
        emit.next({data: {
            name: usersDataSource[id].name
        }});
    }
    )
})
