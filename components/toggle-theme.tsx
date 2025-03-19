"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const themeSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "You need to select a theme."
  })
})

export function ToggleTheme() {
  const { setTheme } = useTheme()

  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema)
  })

  async function onSubmit(value: z.infer<typeof themeSchema>) {
    try {
      setTheme(value.theme)
      toast.success("Success")
    } catch (error) {
      toast.error("Error")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              {/* <FormLabel>Light</FormLabel> */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary grid justify-items-center">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div className="border-muted hover:border-accent aspect-square w-full max-w-44 rounded-md border-2 p-1">
                        <div className="grid h-full w-full grid-rows-3 content-center gap-2 rounded-sm bg-neutral-200 p-2">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div
                              key={index}
                              className="flex h-full w-full flex-col gap-1 rounded-md bg-white p-2 shadow-sm"
                            >
                              <div className="w-3/4 flex-1 rounded-lg bg-neutral-200" />
                              <div className="w-full flex-1 rounded-lg bg-neutral-200" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Light
                      </span>
                    </FormLabel>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary grid justify-items-center">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="border-muted hover:border-accent aspect-square w-full max-w-44 rounded-md border-2 p-1">
                        <div className="grid h-full w-full grid-rows-3 content-center gap-2 rounded-sm bg-neutral-900 p-2">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div
                              key={index}
                              className="flex h-full w-full flex-col gap-1 rounded-md bg-neutral-800 p-2 shadow-sm"
                            >
                              <div className="w-3/4 flex-1 rounded-lg bg-neutral-600" />
                              <div className="w-full flex-1 rounded-lg bg-neutral-600" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Dark
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-auto">
          Save change
        </Button>
      </form>
    </Form>
  )
}
