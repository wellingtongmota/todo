import { TodoDrawer } from "@/components/todo-drawer"
import { Button } from "@/components/ui/button"
import { todoSchema } from "@/schemas/database-tables"
import { format } from "date-fns"
import { Calendar, Check, Text, Trash } from "lucide-react"
import { z } from "zod"

type TTodo = z.infer<typeof todoSchema>

type CardTodoProps = {
  todo: TTodo
  onDelete: () => void
}

export function CardTodo({ todo, onDelete }: CardTodoProps) {
  return (
    <div className="bg-accent animate-fade flex w-full gap-4 rounded-md border p-4 opacity-0">
      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline">
          <Check className="text-muted-foreground" />
        </Button>
      </div>

      <div className="grid flex-1 content-center space-y-2">
        <TodoDrawer title="Edit Todo" todo={todo}>
          <h4 className="cursor-pointer">{todo.title}</h4>
        </TodoDrawer>

        {(todo.dueDate || todo.description) && (
          <div className="flex items-center gap-6">
            {todo.dueDate && (
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground size-3" />
                <p className="text-muted-foreground text-sm">
                  {format(todo.dueDate, "PPP")}
                </p>
              </div>
            )}

            {todo.description && <Text className="size-3" />}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline" onClick={onDelete}>
          <Trash className="text-destructive" />
        </Button>
      </div>
    </div>
  )
}
