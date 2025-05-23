import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdmin, isAuthenticated } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check if user is authenticated and is an admin
    if (!isAuthenticated(request) || !isAdmin(request)) {
      // Redirect to login page with a return URL
      const url = new URL("/login", request.url)
      url.searchParams.set("returnUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
