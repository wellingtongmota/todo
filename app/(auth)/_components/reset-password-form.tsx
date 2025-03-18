"use client"

import { Button, buttonVariants } from "@/components/ui/button"
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
import { ResetPasswordSchema } from "@/schemas/authentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export default function ResetPasswordForm() {
  const [visiblePass, isVisiblePass] = useState<boolean>(false)
  const [visibleConfirmPass, isVisibleConfirmPass] = useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") as string

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token
    })

    if (error) {
      toast.error("Error", {
        description: error.message
      })
    } else {
      toast.success("Success", {
        description:
          "New password registered successfully. Sign in to continue."
      })
      router.push("/sign-in")
    }
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="bg-accent rounded p-6 text-center shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Invalid Reset Link</h1>
          <p className="text-muted-foreground mb-4">
            This password reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className={buttonVariants({ variant: "link" })}
          >
            Go to Forgot your password
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-bold">Reset password</h1>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type={visiblePass ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-muted-foreground flex text-xs">
                    <p
                      className="ml-auto cursor-pointer"
                      onClick={() => isVisiblePass(!visiblePass)}
                    >
                      {visiblePass ? "Hide password" : "Show password"}
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type={visibleConfirmPass ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-muted-foreground flex text-xs">
                    <p
                      className="ml-auto cursor-pointer"
                      onClick={() => isVisibleConfirmPass(!visibleConfirmPass)}
                    >
                      {visibleConfirmPass ? "Hide password" : "Show password"}
                    </p>
                  </div>
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
                Registering
              </>
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
