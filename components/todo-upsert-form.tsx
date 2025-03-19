import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { todoSchema } from "@/schemas/database-tables"
import { z } from "zod"

type TTodo = z.infer<typeof todoSchema>

type TodoUpsertFormProps = React.HTMLAttributes<HTMLFormElement> & {
  className?: string
  todo: TTodo | null
}

export function TodoUpsertForm({ className, todo }: TodoUpsertFormProps) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <Input id="title" placeholder="Title" />
      <Textarea placeholder="Type your description here" />
      <Button type="submit">Save changes</Button>
    </form>
  )
}
