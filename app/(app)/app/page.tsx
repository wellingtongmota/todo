import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { todos } from "@/data/todos"
import { CardTodo } from "./_components/card-todo"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Funnel, Plus } from "lucide-react"
import { ListTodos } from "./_components/list-todos"

export default async function AppPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="wrapper mx-auto grid max-w-2xl py-4">
      <h2 className="headline-3 mb-6 sm:mb-8">Hello, {session?.user.name}!</h2>

      <ListTodos todos={todos} />
    </div>
  )
}
