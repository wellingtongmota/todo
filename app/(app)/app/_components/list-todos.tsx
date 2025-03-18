"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { todoSchema } from "@/schemas/database-tables"
import { Funnel, Plus } from "lucide-react"
import { z } from "zod"
import { CardTodo } from "./card-todo"

type TTodo = z.infer<typeof todoSchema>

type ListTodosProps = {
  todos: TTodo[]
}

export function ListTodos({ todos }: ListTodosProps) {
  return (
    <div className="grid">
      <h3 className="headline-4 mb-1">Todos</h3>
      <Separator className="mb-4 sm:mb-6" />

      <div className="mb-4 flex gap-3 sm:mb-6">
        <Button size="sm">
          <Plus />
          New todo
        </Button>

        <Button size="sm" variant="outline">
          <Funnel />
          Filters
        </Button>
      </div>

      <div className="grid space-y-4">
        {todos.map((todo) => (
          <CardTodo todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  )
}
