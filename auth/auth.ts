import authConfig from "@/auth/auth.config"
import { getUserById, updateEmailVerified } from "@/data/user"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    linkAccount: async ({ user }) => {
      await updateEmailVerified(user.id, new Date())
    },
  },

  callbacks: {
    signIn: async ({ user }) => {
      const dbUser = await getUserById(user.id)

      // return !(!dbUser || !dbUser.email_verified_at)

      return true
    },

    session: async ({ token, session }) => {
      if (!session.user) {
        return session
      }

      if (token.sub) {
        session.user.id = token.sub
      }

      if (token.role) {
        session.user.role = token.role as UserRole
      }

      return session
    },

    jwt: async ({ token }) => {
      if (!token.sub) {
        return token
      }

      const dbUser = await getUserById(token.sub)
      if (!dbUser) {
        return token
      }

      token.role = dbUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
