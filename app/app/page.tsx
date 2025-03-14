import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function AppPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div>
      <p>Olá, {session?.user.name}</p>
    </div>
  )
}
