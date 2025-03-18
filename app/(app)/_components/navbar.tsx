import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/lib/auth"
import { ListTodo } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { NavUser } from "./nav-user"

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <header className="sticky top-0 flex h-14 items-center border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/app">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <ListTodo className="size-4" />
            </div>
            <h1 className="text-xl font-semibold">
              todo<span className="text-primary">Nookdev</span>
            </h1>
          </div>
        </Link>

        {session?.user ? (
          <NavUser user={session.user}>
            <Avatar className="cursor-pointer">
              {session.user.image && (
                <AvatarImage src={session.user.image} alt="Avatar usuário" />
              )}
              <AvatarFallback>{session.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </NavUser>
        ) : (
          <Link href="/sign-in">Entrar</Link>
        )}
      </div>
    </header>
  )
}
