import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z } from 'zod'
import { prisma } from '../../../db'

export const findUserByIdResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
        id: z.number({
          invalid_type_error: "id must be number",
        }).nullish(),
        include: z.object({
          posts: z.boolean({
            invalid_type_error: "posts must be a boolean",
          })
        })
    })
).output((value): any => {
    if (typeof value === 'object') {
      return value;
    }
    throw new Error('Output is not a object');
  }).query(async ({ input }:any) => {
    const user = await prisma.user.findUnique({
        where: {
          id: input.id
        },
        include: {
          posts: input.include.posts
        }
      })
    return user;
})