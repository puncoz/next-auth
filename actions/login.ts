"use server"
import { signIn } from "@/auth/auth"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid email or password" }
  }

  const { email, password } = validation.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(email, verificationToken.token)

    return { success: "Confirmation email sent!" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password" }
      }

      return { error: "Something went wrong" }
    }

    throw error
  }

  return { success: "Logged in!" }
}
