import { z } from 'zod'

export const postsInclude = z.object({
    id: z.boolean({
      invalid_type_error: "do you want to expose id field?",
    }).default(true),
    title: z.boolean({
      invalid_type_error: "do you want to expose title field?",
    }).default(true),
    description: z.boolean({
      invalid_type_error: "do you want to expose description field?",
    }).default(true),
    createAt: z.boolean({
      invalid_type_error: "do you want to expose createAt field?",
    }).default(true),
    updatedAt: z.boolean({
      invalid_type_error: "do you want to expose createAt field?",
    }).default(true),
})
