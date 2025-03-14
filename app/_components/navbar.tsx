import { ListTodo } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 flex h-14 items-center border-b">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <ListTodo className="size-4" />
          </div>
          <h1 className="text-xl font-semibold">
            Todo<span className="text-primary">Noookdev</span>
          </h1>
        </div>
      </div>
    </header>
  )
}
