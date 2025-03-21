import { TodoDrawer } from "@/components/todo-drawer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { todoSchema } from "@/schemas/database-tables"
import { format } from "date-fns"
import { Calendar, Check, Text, Trash, Undo } from "lucide-react"
import { z } from "zod"

type TTodo = z.infer<typeof todoSchema>

type CardTodoProps = {
  todo: TTodo
  info: boolean
  onDelete: () => void
  onToggle: () => void
}

export function CardTodo({ todo, info, onDelete, onToggle }: CardTodoProps) {
  return (
    <div className="bg-accent animate-fade flex w-full gap-4 rounded-md border p-3 opacity-0">
      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline" onClick={onToggle}>
          {todo.completed ? <Undo className="text-muted-foreground" /> : <Check className="text-muted-foreground" />}
          
        </Button>
      </div>

      <div className="grid flex-1 content-center space-y-2">
        <TodoDrawer title="Edit Todo" todo={todo}>
          <h4 className={cn(["cursor-pointer", todo.completed && "line-through text-green-600 decoration-green-600"])}>{todo.title}</h4>
        </TodoDrawer>

        {info && (
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
