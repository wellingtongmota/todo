import { buttonVariants } from "../ui/button"

export function ResetPasswordTemplate({ url }: { url: string }) {
  return (
    <div>
      <h2 className="text-gray-800">Reset Your Password</h2>
      <p>
        We received a request to reset your password. Click the link below to
        choose a new password:
      </p>
      <a href={url} className={buttonVariants({ variant: "link" })}>
        Reset Password
      </a>
      <p>
        If you did not request a password reset, please ignore this email or
        contact support if you have questions.
      </p>
      <p>Thank you,</p>
      <p>The TodoNookdev Team</p>
    </div>
  )
}
