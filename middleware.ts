import { NextRequest, NextResponse } from "next/server"
import { getUrl } from "./lib/get-url"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("better-auth.session_token")
  const pathname = request.nextUrl.pathname

  if ((pathname === "/sign-in" || pathname === "/sign-up") && token) {
    return NextResponse.redirect(new URL(getUrl("/app")))
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(getUrl("/app")))
  }

  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/sign-in")))
  }

  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/sign-in")))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
