"use server"

import { prisma } from "@/lib/prisma"
import { getUserSession } from "./user"
import { upsertTodoSchema } from "@/schemas/database-tables"
import { z } from "zod"

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

export async function upsertTodo(input: unknown) {
  const userId = await getUserSession()

  if (!userId) {
    return { error: "Not authorized", success: false, data: null }
  }

  // Validação do input com Zod
  const parseResult = upsertTodoSchema.safeParse(input)
  if (!parseResult.success) {
    return { error: "Invalid input", data: null }
  }

  const { id, title, description } = parseResult.data

  if (!id && !title) {
    return { error: "Title is required when creating a todo", data: null }
  }

  // Uso do upsert para evitar consultas separadas
  const todo = await prisma.todo.upsert({
    where: { id: id ?? "" }, // Se não houver ID, será uma criação
    create: {
      title: title!,
      description,
      userId
    },
    update: {
      title,
      description
    }
  })

  return { error: null, data: todo }
}

// export async function upsertTodo(input: z.infer<typeof upsertTodoSchema>) {
//   try {
//     // Validate input with zod
//     const validatedInput = upsertTodoSchema.parse(input)

//     // Check authentication
//     const userId = await getUserSession()
//     if (!userId) {
//       return {
//         error: "Não autorizado",
//         success: false,
//         data: null
//       }
//     }

//     // Update existing todo
//     if (validatedInput.id) {
//       // Check if todo exists and belongs to user
//       const existingTodo = await prisma.todo.findUnique({
//         where: {
//           id: validatedInput.id,
//           userId
//         }
//       })

//       if (!existingTodo) {
//         return {
//           error: "Todo não encontrado ou sem permissão para editar",
//           success: false,
//           data: null
//         }
//       }

//       // Validate that at least one field is provided for update
//       if (!validatedInput.title && validatedInput.description === undefined) {
//         return {
//           error: "Nenhum campo fornecido para atualização",
//           success: false,
//           data: null
//         }
//       }

//       // Prepare update data
//       const updateData: any = {}

//       if (validatedInput.title !== undefined) {
//         updateData.title = validatedInput.title
//       }

//       if (validatedInput.description !== undefined) {
//         updateData.description = validatedInput.description
//       }

//       // Update todo
//       const updatedTodo = await prisma.todo.update({
//         where: {
//           id: validatedInput.id,
//           userId
//         },
//         data: updateData
//       })

//       return {
//         error: null,
//         success: true,
//         data: updatedTodo
//       }
//     }

//     // Create new todo
//     // Title is required for new todos
//     if (!validatedInput.title || validatedInput.title.trim() === "") {
//       return {
//         error: "Título é obrigatório para criar um novo todo",
//         success: false,
//         data: null
//       }
//     }

//     const newTodo = await prisma.todo.create({
//       data: {
//         title: validatedInput.title,
//         description: validatedInput.description ?? null,
//         userId,
//         completed: false
//       }
//     })

//     return {
//       error: null,
//       success: true,
//       data: newTodo
//     }
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return {
//         error:
//           "Dados inválidos: " + error.errors.map((e) => e.message).join(", "),
//         success: false,
//         data: null
//       }
//     }

//     console.error("Erro ao criar/atualizar todo:", error)
//     return {
//       error: "Ocorreu um erro ao processar sua solicitação",
//       success: false,
//       data: null
//     }
//   }
// }
