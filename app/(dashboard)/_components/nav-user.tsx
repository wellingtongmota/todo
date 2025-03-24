"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Session } from "@/types/auth-types"
import { LayoutDashboard, LogOut, LucideIcon, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"

type TLink = {
  title: string
  url: string
  icon: LucideIcon
}

const links: TLink[] = [
  {
    title: "Dashboard",
    url: "/app",
    icon: LayoutDashboard
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: Settings
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
          {links.map(({ title, url, icon: Icon }) => (
            <Link key={title} href={url}>
              <DropdownMenuItem
                className={cn(["", isActive(url) && "text-primary"])}
              >
                <Icon />
                {title}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSignOut()}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
