import { betterFetch } from "@better-fetch/fetch"
import { NextResponse, type NextRequest } from "next/server"
import { Session } from "./types/auth-types"

const authRoutes = ["/sign-in", "/sign-up"]
const passwordRoutes = ["/reset-password", "/forgot-password"]
// const adminRoutes = ["/admin"]

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const isAuthRoute = authRoutes.includes(pathName)
  const isPasswordRoute = passwordRoutes.includes(pathName)
  // const isAdminRoute = adminRoutes.includes(pathName)

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || ""
      }
    }
  )

  if (!session) {
    if (pathName === "/" || isAuthRoute || isPasswordRoute) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (pathName === "/" || isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL("/app", request.url))
  }

  // if (isAdminRoute && session.user.role !== "admin") {
  //   return NextResponse.redirect(new URL("/app", request.url));
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
}
