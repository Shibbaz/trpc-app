import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z } from 'zod'
import { prisma } from '../../../db'

export const usersListResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
      pagination: z.object({
        page: z.number().nullish(),
        limit: z.number().nullish()
      }),
      include: z.object({
        posts: z.boolean({
          invalid_type_error: "posts must be a boolean",
        })
      })
    })).output((value): any => {
        if (typeof value === 'object') {
          return value;
        }
        throw new Error('Output is not a object');
      }).query(async({ input }) => {
    if (input.pagination.page == null || input.pagination.limit == null){
        const users = await prisma.user.findMany({
          include: {
            posts: true
          }
        })
        return users;
    }else{
        const users = await prisma.user.findMany({
            include: {
              posts: input.include.posts
            },
            skip: input.pagination.page*input.pagination.limit,
            take: input.pagination.limit,
          })
        return users;
    }
})
