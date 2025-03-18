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
import { SignInSchema } from "@/schemas/authentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { Github, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export function SignInForm() {
  const [pendingGitHub, setPendingGitHub] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const { email, password } = values

    const { data, error } = await authClient.signIn.email(
      { email, password },
      {
        onSuccess: (ctx) => {
          toast.success("Success", {
            description: "Welcome"
          })

          form.reset()
          router.push("/app")
        },
        onError: (ctx) => {
          // display the error message
          toast.error("Error", {
            description: ctx.error.message
          })
        }
      }
    )
  }

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social(
      {
        provider: "github"
      },
      {
        onRequest: () => {
          setPendingGitHub(true)
        },
        onSuccess: () => {
          toast.success("Success", {
            description: "Welcome"
          })
          router.push("/app")
          router.refresh()
        },
        onError: (ctx) => {
          // display the error message
          toast.error("Error", {
            description: ctx.error.message
          })
        }
      }
    )
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to access your account
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
                      <Input
                        id="email"
                        {...field}
                        placeholder="m@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
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
                  Signing in
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="grid gap-6">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGitHubSignIn}
          disabled={pendingGitHub}
        >
          {pendingGitHub && <LoaderCircle className="animate-spin" />}
          {!pendingGitHub && <Github />}
          Sign in with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        {`Don't have an account? `}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  )
}
