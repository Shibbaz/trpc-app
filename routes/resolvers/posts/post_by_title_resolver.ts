import { publicProcedure, loggerMiddleware } from '../../../trpc';
import { z } from 'zod'
import { prisma } from '../../../db'

export const postByTitleResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
        title: z.string().nullish(),
    })
).output((value): any => {
    if (typeof value === 'object') {
      return value;
    }
    throw new Error('Output is not a object');
  }).query(async ({ input }:any) => {
    const post = await prisma.post.findMany({
        where: input,
      })
    return post;
})
