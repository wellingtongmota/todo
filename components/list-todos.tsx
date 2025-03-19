"use client"

import { deleteTodo } from "@/actions/todo"
import { CardTodo } from "@/components/card-todo"
import { TodoDrawer } from "@/components/todo-drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { todoSchema } from "@/schemas/database-tables"
import { Funnel, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"

type TTodo = z.infer<typeof todoSchema>

type ListTodosProps = {
  todos: TTodo[]
}

export function ListTodos({ todos }: ListTodosProps) {
  const router = useRouter()
  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId)
      router.refresh()
      toast.success("Deletion Successful", {
        description: "The todo item has been successfully deleted."
      })
    } catch (error) {
      toast.error("Error")
    }
  }

  return (
    <div className="grid">
      <h3 className="headline-4 mb-1">Todos</h3>
      <Separator className="mb-4 sm:mb-6" />

      <div className="mb-4 flex gap-3 sm:mb-6">
        <TodoDrawer title="New Todo">
          <Button size="sm">
            <Plus />
            New todo
          </Button>
        </TodoDrawer>

        <Button size="sm" variant="outline">
          <Funnel />
          Filters
        </Button>
      </div>

      <div className="grid space-y-4">
        {todos.map((todo) => (
          <CardTodo
            todo={todo}
            key={todo.id}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  )
}
