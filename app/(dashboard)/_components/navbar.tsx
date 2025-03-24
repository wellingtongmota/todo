import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { ArrowRight, ListTodo } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { NavUser } from "./nav-user"

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center backdrop-blur-3xl">
      <div className="wrapper flex max-w-screen-2xl items-center justify-between">
        <Link href={session ? "/app" : "/"}>
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
          <div className="relative">
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#7C3AED"]}
              mode="colorShift"
              blur="soft"
              duration={3}
              scale={0.9}
            />
            <Link
              href="/sign-in"
              className={cn([buttonVariants(), "dark:bg-background relative"])}
            >
              Sign in <ArrowRight />
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
