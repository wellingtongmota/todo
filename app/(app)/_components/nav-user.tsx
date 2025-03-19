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
import { Session } from "@/types/auth-types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type NavUserProps = {
  children: React.ReactNode
  user: Session["user"]
}

export function NavUser({ children, user }: NavUserProps) {
  const router = useRouter()
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
          <Link href="/app/settings">
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => handleSignOut()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
