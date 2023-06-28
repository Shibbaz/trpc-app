import { publicProcedure } from '../../trpc';
import { z } from 'zod'
import { usersDataSource } from '../../models/users/dataSource'

export const usersListResolver = publicProcedure.query(async() => {
    return usersDataSource
})

export const userByNameResolver = publicProcedure.input(
    z.object({
        name: z.string().nullish(),
    })
).query(({ input }:any) => {
    let obj = usersDataSource.find(o => o.name === input.name);

    return obj;
})
export const helloUserResolver = publicProcedure.input(
    z.object({
      text: z.string().nullish(),
    })).query(({ input }:any) => {
        return {
            text: `Hello ${ input.text }`
        }
    })