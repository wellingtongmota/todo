import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import { openAPI } from "better-auth/plugins"
import { Resend } from "resend"
import { VerifyEmailTemplate } from "@/components/email/verify-email-template"
import { ResetPasswordTemplate } from "@/components/email/reset-password-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_TRUSTED_URL as string],
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "todoNookdev <noreply@nookdev.com.br>",
        to: [user.email],
        subject: "Reset your password",
        react: ResetPasswordTemplate({ url })
      })
    }
    // autoSignIn: false
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.NEXT_PUBLIC_APP_VERIFIED_EMAIL}`
      await resend.emails.send({
        from: "todoNookdev <noreply@nookdev.com.br>",
        to: [user.email],
        subject: "Verify your email",
        react: VerifyEmailTemplate({ url: verificationUrl })
      })
    }
  },
  socialProviders: {
    github: {
      redirectURI: `${process.env.NEXT_PUBLIC_TRUSTED_URL}/api/auth/callback/github`,
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  }
})
