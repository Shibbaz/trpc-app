import { publicProcedure, loggerMiddleware } from '../../trpc';
import { z } from 'zod'
import { prisma } from '../../db'

export const usersListResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
        page: z.number().nullish(),
        limit: z.number().nullish()
    })).output((value): any => {
        if (typeof value === 'object') {
          return value;
        }
        throw new Error('Output is not a object');
      }).query(async({ input }) => {
    if (input.page == null || input.limit == null){
        return await prisma.user.findMany()
    }else{
        return await prisma.user.findMany({
            skip: input.page*input.limit,
            take: input.limit,
          })
    }
})

export const userByNameResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
        name: z.string().nullish(),
    })
).output((value): any => {
    if (typeof value === 'object') {
      return value;
    }
    throw new Error('Output is not a object');
  }).query(async ({ input }:any) => {
    const user = await prisma.user.findMany({
        where: input,
      })
    return user;
})
