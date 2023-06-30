import { z} from 'zod'

export const createUserInput = z.object({
    name: z.string().nullish(),
    age: z.number().nullish()
})

export const deleteUserInput = z.object({
    id: z.number(),
})