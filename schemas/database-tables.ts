import { z } from "zod"

export const todoSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  completed: z.boolean().default(false),
  dueDate: z.date().optional().nullable()
})
