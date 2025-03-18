import { Button } from "@/components/ui/button"
import { Todo } from "@/data/todos"
import { Calendar, Check, Trash } from "lucide-react"

type CardTodoProps = {
  todo: Todo
}

export function CardTodo({ todo }: CardTodoProps) {
  return (
    <div className="bg-accent flex w-full gap-4 rounded-md border p-4">
      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline">
          <Check className="text-muted-foreground" />
        </Button>
      </div>

      <div className="flex-1">
        <h4 className="mb-2">{todo.title}</h4>

        <div className="flex items-center gap-2">
          <Calendar className="size-3" />
          <p className="text-muted-foreground text-sm">
            {todo.dueDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button size="icon" variant="outline">
          <Trash className="text-destructive" />
        </Button>
      </div>
    </div>
  )
}
