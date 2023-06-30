import { z } from 'zod'
import { postsInclude } from "./users_fields"

export const singleUserResolverInput = z.object({
    id: z.number({
      invalid_type_error: "id must be number",
    }).nullish(),
    posts: z.object({
      select: postsInclude.nullish(),
      skip: z.number().default(0),
      take: z.number().default(100000)
    }).nullish()
})

export const multipleUsersResolverInput = z.object({
  skip: z.number().default(0),
  take: z.number().default(100000),
  conditions: z.object({
    id: z.number({
      invalid_type_error: "id must be number",
    }).nullish(),
    name: z.string({
      invalid_type_error: "name must be string",
    }).nullish()
  }).nullish(),
  posts: z.object({
    select: postsInclude.nullish(),
    skip: z.number().default(0),
    take: z.number().default(100000)
  }).nullish()})