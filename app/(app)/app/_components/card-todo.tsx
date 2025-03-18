import { Button } from "@/components/ui/button"
import { todoSchema } from "@/schemas/database-tables"
import { Calendar, Check, Trash } from "lucide-react"
import { z } from "zod"

type TTodo = z.infer<typeof todoSchema>

type CardTodoProps = {
  todo: TTodo
}

export function CardTodo({ todo }: CardTodoProps) {
  return (
    <div className="bg-accent flex w-full gap-4 rounded-md border p-4">
      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline">
          <Check className="text-muted-foreground" />
        </Button>
      </div>

      <div className="grid flex-1 content-center">
        <h4>{todo.title}</h4>

        {todo.dueDate && (
          <div className="mt-4 flex items-center gap-2">
            <Calendar className="size-3" />
            <p className="text-muted-foreground text-sm">
              {todo.dueDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              })}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline">
          <Trash className="text-destructive" />
        </Button>
      </div>
    </div>
  )
}
