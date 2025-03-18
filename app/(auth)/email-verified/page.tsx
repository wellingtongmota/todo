import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function EmailVerifiedPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-accent rounded p-6 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Email Verified</h1>
        <p className="text-muted-foreground mb-4">
          Your email has been successfully verified. You can now access all the
          features of your account.
        </p>
        <Link href="/app" className={buttonVariants({ variant: "link" })}>
          Go to your dashboard
        </Link>
      </div>
    </div>
  )
}
