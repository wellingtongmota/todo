"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { convertImageToBase64 } from "@/lib/utils"
import { UpdateUserSchema } from "@/schemas/authentication"
import { Session } from "@/types/auth-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ProfileFormProps = {
  user: Session["user"] | null
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user ? user.name : "",
      image: undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    try {
      await authClient.updateUser(
        {
          image: values.image
            ? await convertImageToBase64(values.image)
            : undefined,
          name: values.name
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully")
            router.refresh()
          },
          onError: (ctx) => {
            toast.error("Error", {
              description: ctx.error.message
            })
          }
        }
      )
    } catch (error) {
      toast.error("Something went wrong, please try again")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit" className="ml-auto">
          Save changes
        </Button>
      </form>
    </Form>
  )
}
