"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return session?.user?.id ?? null
}
