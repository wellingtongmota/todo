import { upsertTodo } from "@/actions/todo"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { todoSchema, upsertTodoSchema } from "@/schemas/database-tables"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type TTodo = z.infer<typeof todoSchema>
type TUpsertTodo = z.infer<typeof upsertTodoSchema>

type TodoUpsertFormProps = React.HTMLAttributes<HTMLFormElement> & {
  className?: string
  todo: TTodo | null
  onSuccess: () => void
}

export function TodoUpsertForm({
  className,
  todo,
  onSuccess,
  ...props
}: TodoUpsertFormProps) {
  const router = useRouter()

  const form = useForm<TUpsertTodo>({
    resolver: zodResolver(upsertTodoSchema),
    defaultValues: {
      id: todo?.id || undefined,
      title: todo?.title || "",
      description: todo?.description || ""
    }
  })

  async function onSubmit(values: z.infer<typeof upsertTodoSchema>) {
    try {
      const result = await upsertTodo(values)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Success")
        router.refresh()
        onSuccess()
      }
    } catch (error) {
      toast.error("Error")
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Type your description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
