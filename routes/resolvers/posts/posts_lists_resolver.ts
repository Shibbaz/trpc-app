import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z } from 'zod'
import { prisma } from '../../../db'

export const postsListResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
        pagination: z.object({
          page: z.number().nullish(),
          limit: z.number().nullish()
        })

    })).output((value): any => {
        if (typeof value === 'object') {
          return value;
        }
        throw new Error('Output is not a object');
      }).query(async({ input }) => {
    if (input.pagination.page == null || input.pagination.limit == null){
        return await prisma.post.findMany()
    }else{
        return await prisma.post.findMany({
            skip: input.pagination.page*input.pagination.limit,
            take: input.pagination.limit,
          })
    }
})
