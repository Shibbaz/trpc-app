import { z} from 'zod'

export const createPostInput = z.object({
    title: z.string(),
    description: z.string().nullish(),
    authorId: z.number()
})

export const deletePostInput = z.object({
    id: z.number(),
})

export const updatePostInput = z.object({
    id: z.number(),
    title: z.string().nullish(),
    description: z.string().nullish(),
})