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

  await prisma.todo.delete({
    where: {
      id: todoId
    }
  })

  return {
    error: null,
    data: "Todo deleted successfully"
  }
}
