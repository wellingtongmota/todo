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
import { cn } from "@/lib/utils"
import { ChangePasswordSchema } from "@/schemas/authentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ChangePasswordFormProps = React.HTMLAttributes<HTMLFormElement> & {
  className?: string
  onSuccess: () => void
}

export function ChangePasswordForm({
  className,
  onSuccess
}: ChangePasswordFormProps) {
  const [visibleCurrentPass, isVisibleCurrentPass] = useState<boolean>(false)
  const [visibleNewPass, isVisibleNewPass] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    const result = await authClient.changePassword({
      newPassword: values.newPassword,
      currentPassword: values.currentPassword,
      revokeOtherSessions: true // revoke all other sessions the user is signed into
    })

    if (result.error) {
      toast.error("Error", { description: result.error.message })
    } else {
      toast.success("Success", {
        description: "Your password has been changed successfully."
      })

      onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(["grid space-y-4", className])}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input
                    type={visibleCurrentPass ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <div className="text-muted-foreground flex text-xs">
                  <p
                    className="ml-auto cursor-pointer"
                    onClick={() => isVisibleCurrentPass(!visibleCurrentPass)}
                  >
                    {visibleCurrentPass ? "Hide password" : "Show password"}
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    type={visibleNewPass ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <div className="text-muted-foreground flex text-xs">
                  <p
                    className="ml-auto cursor-pointer"
                    onClick={() => isVisibleNewPass(!visibleNewPass)}
                  >
                    {visibleNewPass ? "Hide password" : "Show password"}
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}
