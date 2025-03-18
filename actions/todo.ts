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
