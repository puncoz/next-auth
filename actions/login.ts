"use server"
import { signIn } from "@/auth/auth"
import {
  addTwoFactorConfirmation,
  getTwoFactorConfirmationByUserId,
  removeTwoFactorConfirmation,
} from "@/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail, removeTwoFactorToken } from "@/data/two-factor-token"
import { getUserByEmail } from "@/data/user"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>, callBackUrl?: string) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid email or password" }
  }

  const { email, password, code } = validation.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(email, verificationToken.token)

    return { success: "Confirmation email sent!" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

      return { twoFactor: true }
    }

    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
    if (!twoFactorToken) {
      return { error: "Invalid code!" }
    }

    if (twoFactorToken.token !== code) {
      console.log({ twoFactorToken, code })
      return { error: "Invalid code!" }
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date()
    if (hasExpired) {
      return { error: "Code expired!" }
    }

    await removeTwoFactorToken(twoFactorToken.id)

    const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
    if (existingConfirmation) {
      await removeTwoFactorConfirmation(existingConfirmation.id)
    }

    await addTwoFactorConfirmation(existingUser.id)
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
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
