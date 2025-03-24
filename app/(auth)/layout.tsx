import { ListTodo } from "lucide-react"
import Link from "next/link"

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh">
      <div className="flex flex-col gap-4 p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
            <ListTodo className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-base leading-tight">
            <h1 className="truncate font-semibold">
              todo<span className="text-primary">Nookdev</span>
            </h1>
            <p className="text-muted-foreground text-sm">A simple todo app</p>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  )
}
