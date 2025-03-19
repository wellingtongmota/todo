import { upsertTodo } from "@/actions/todo"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Calendar } from "./ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

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
      description: todo?.description || "",
      dueDate: todo?.dueDate || undefined
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

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
