"use client"

import { deleteTodo, toggleTodo } from "@/actions/todo"
import { CardTodo } from "@/components/card-todo"
import { TodoDrawer } from "@/components/todo-drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { todoSchema } from "@/schemas/database-tables"
import { Plus } from "lucide-react"
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
      const result = await toggleTodo(todoId)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Deletion Successful", {
          description: "The todo item has been successfully deleted."
        })
        router.refresh()
      }
    } catch (error) {
      toast.error("Error")
    }
  }

  const handleToggleTodo = async (todoId: string) => {
    try {
      const result = await toggleTodo(todoId)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Success")
        router.refresh()
      }
    } catch (error) {
      toast.error("Error")
    }
  }

  const todosPending = todos.filter((todo) => !todo.completed)
  const todosCompleted = todos.filter((todo) => todo.completed)

  return (
    <div className="grid gap-8">
      {/* Seção de To-dos Pendentes */}
      <section>
        <h3 className="headline-3 mb-1">To-dos</h3>
        <Separator className="mb-4 sm:mb-6" />

        <div className="mb-4 flex gap-3 sm:mb-6">
          <TodoDrawer title="New Todo">
            <Button size="sm">
              <Plus />
              New todo
            </Button>
          </TodoDrawer>
        </div>

        <div className="grid space-y-4">
          {todosPending.length > 0 ? (
            todosPending.map((todo) => (
              <CardTodo
                key={todo.id}
                todo={todo}
                onDelete={() => handleDeleteTodo(todo.id)}
                onToggle={() => handleToggleTodo(todo.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No pending todos</p>
          )}
        </div>
      </section>

      {/* Seção de To-dos Completados */}
      <section>
        <h3 className="headline-3 mb-1">Completed</h3>
        <Separator className="mb-4 sm:mb-6" />

        <div className="grid space-y-4">
          {todosCompleted.length > 0 ? (
            todosCompleted.map((todo) => (
              <CardTodo
                key={todo.id}
                todo={todo}
                onDelete={() => handleDeleteTodo(todo.id)}
                onToggle={() => handleToggleTodo(todo.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No completed todos</p>
          )}
        </div>
      </section>
    </div>
  )
}
