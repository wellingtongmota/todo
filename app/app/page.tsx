import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function AppPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="wrapper py-4">
      <p>Olá, {session?.user.name}</p>
    </div>
  )
}
