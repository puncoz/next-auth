import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validations = LoginSchema.safeParse(credentials)

        if (!validations.success) {
          return null
        }

        const { email, password } = validations.data
        const user = await getUserByEmail(email)
        if (!user || !user.password) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
          return null
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
