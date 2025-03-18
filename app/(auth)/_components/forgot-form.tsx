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
import { ForgotPasswordSchema } from "@/schemas/authentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export function ForgotForm() {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const { error } = await authClient.forgetPassword({
      email: data.email,
      redirectTo: "/reset-password"
    })

    if (error) {
      toast.error("Error", { description: error.message })
    } else {
      toast.success(
        "If an account with that email exists, you will receive an email with a password reset link."
      )
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Recover your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to recover your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" {...field} placeholder="m@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Sending
              </>
            ) : (
              "Send"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Remembered your password?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  )
}
