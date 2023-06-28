import { publicProcedure, loggerMiddleware } from '../../trpc';
import { z } from 'zod'
import { prisma } from '../../db'

export const usersListResolver = publicProcedure.use(loggerMiddleware).query(async() => {
    return await prisma.user.findMany()
})

export const userByNameResolver = publicProcedure.use(loggerMiddleware).input(
    z.object({
        name: z.string().nullish(),
    })
).query(async ({ input }:any) => {
    const user = await prisma.user.findMany({
        where: input,
      })
    return user;
})
