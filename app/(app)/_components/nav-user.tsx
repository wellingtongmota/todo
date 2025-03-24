"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Session } from "@/types/auth-types"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

type TLink = {
  title: string
  url: string
}

const links: TLink[] = [
  {
    title: "Dashboard",
    url: "/app"
  },
  {
    title: "Settings",
    url: "/app/settings"
  }
]

type NavUserProps = {
  children: React.ReactNode
  user: Session["user"]
}

export function NavUser({ children, user }: NavUserProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully signed out!")
        }
      }
    })
    router.push("/sign-in")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {links.map((link) => (
            <Link key={link.title} href={link.url}>
              <DropdownMenuItem
                className={cn(["", isActive(link.url) && "text-primary"])}
              >
                {link.title}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSignOut()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
