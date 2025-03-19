"use server"

import { prisma } from "@/lib/prisma"
import { getUserSession } from "./user"

export async function getTodos() {
  const userId = await getUserSession()

  if (!userId) {
    return []
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: userId
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
