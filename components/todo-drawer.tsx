"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { todoSchema } from "@/schemas/database-tables"
import { useState } from "react"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"

type TTodo = z.infer<typeof todoSchema>

type TodoDrawerProps = {
  children: React.ReactNode
  todo?: TTodo
}

export function TodoDrawer({ children, todo }: TodoDrawerProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>{children}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              {`Create or make changes. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <UpsertTodoForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>{children}</div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Todo</DrawerTitle>
          <DrawerDescription>
            {`Create or make changes. Click save when you're done.`}
          </DrawerDescription>
        </DrawerHeader>
        <UpsertTodoForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function UpsertTodoForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <Input id="title" placeholder="Title" />
      <Textarea placeholder="Type your description here." />
      <Button type="submit">Save changes</Button>
    </form>
  )
}
