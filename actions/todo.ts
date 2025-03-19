"use server"

import { prisma } from "@/lib/prisma"
import { upsertTodoSchema } from "@/schemas/database-tables"
import { z } from "zod"
import { getUserSession } from "./user"

export async function getTodos() {
  const userId = await getUserSession()

  if (!userId) {
    return []
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      updatedAt: "desc"
    }
  })

  return todos
}

export async function deleteTodo(todoId: string) {
  const userId = await getUserSession()

  if (!userId) {
    return {
      error: "Not authorized",
      data: null
    }
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
      userId: userId
    },
    select: {
      id: true
    }
  })

  if (!todo) {
    return {
      error: "Not found",
      data: null
    }
  }

  await prisma.todo.delete({
    where: {
      id: todoId,
      userId: userId
    }
  })

  return {
    error: null,
    data: "Todo deleted successfully"
  }
}

export async function upsertTodo(input: z.infer<typeof upsertTodoSchema>) {
  const userId = await getUserSession()

  if (!userId) {
    return {
      error: "Not authorized",
      success: false,
      data: null
    }
  }

  // Validação do input com Zod
  const parseResult = upsertTodoSchema.safeParse(input)

  if (!parseResult.success) {
    return {
      error: "Invalid input",
      success: false,
      data: null
    }
  }

  const { id, title, description, dueDate } = parseResult.data

  if (!id && !title) {
    return {
      error: "Title is required when creating a todo",
      success: false,
      data: null
    }
  }

  const todo = await prisma.todo.upsert({
    where: { id: id ?? "" },
    create: {
      title: title!,
      description,
      dueDate,
      userId
    },
    update: {
      title,
      description,
      dueDate
    }
  })

  return {
    error: null,
    success: true,
    data: todo
  }
}
