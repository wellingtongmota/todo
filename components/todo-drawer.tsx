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
import { useMediaQuery } from "@/hooks/use-media-query"
import { todoSchema } from "@/schemas/database-tables"
import { useState } from "react"
import { z } from "zod"
import { TodoUpsertForm } from "./todo-upsert-form"

type TTodo = z.infer<typeof todoSchema>

type TodoDrawerProps = {
  children: React.ReactNode
  title: string
  todo?: TTodo
}

export function TodoDrawer({ children, title, todo }: TodoDrawerProps) {
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
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {`Create or make changes. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <TodoUpsertForm className="px-4" todo={todo ? todo : null} />
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
        <TodoUpsertForm className="px-4" todo={todo ? todo : null} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
