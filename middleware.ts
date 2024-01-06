import authConfig from "@/auth/auth.config"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  if (isApiAuthRoute) {
    return null
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return null
  }

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodeCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodeCallbackUrl}`,
      nextUrl,
    ))
  }

  return null
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
