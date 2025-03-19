import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ListTodos } from "./_components/list-todos"
import { getTodos } from "@/actions/todo"
import { z } from "zod"
import { todoSchema } from "@/schemas/database-tables"
import { Suspense } from "react"
import { BlockListSkeleton } from "@/components/block-list-skeleton"

type TTodo = z.infer<typeof todoSchema>

export default async function AppPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const todos: TTodo[] = await getTodos()

  return (
    <div className="wrapper mx-auto grid max-w-2xl py-4">
      <h2 className="headline-3 mb-6 sm:mb-8">Hello, {session?.user.name}!</h2>

      <Suspense fallback={<BlockListSkeleton />}>
        <ListTodos todos={todos} />
      </Suspense>
    </div>
  )
}
