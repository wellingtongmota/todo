import { z } from "zod"

export const todoSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z.string().optional().nullable(),
  completed: z.boolean().default(false),
  dueDate: z.date().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export const upsertTodoSchema = z.object({
  id: z.string().optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.date().optional()
})
