import { z } from 'zod'
import { postsInclude } from "./post_fields"

export const postByTitleResolverInput = z.object({
  title: z.string().nullish(),
})

export const postListResolverInput = z.object({
  pagination: z.object({
    page: z.number().nullish(),
    limit: z.number().nullish()
  })
})
