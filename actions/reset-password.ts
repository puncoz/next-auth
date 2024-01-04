"use server"
import { getPasswordResetTokenByToken, removePasswordResetToken } from "@/data/password-resets"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { getUserByEmail, updatePassword } from "../data/user"
import { sendPasswordResetEmail } from "../lib/mail"
import { generatePasswordResetToken } from "../lib/tokens"
import { ForgotPasswordSchema, ResetPasswordSchema } from "../schemas"

export const sendResetPasswordLink = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validation = ForgotPasswordSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid email" }
  }

  const { email } = validation.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: "Email does not exist" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(email, passwordResetToken.token)

  return { success: "Reset email sent!" }
}

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>, token?: string | null) => {
  if (!token) {
    return { error: "Missing token!" }
  }

  const validation = ResetPasswordSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid password!" }
  }

  const { password } = validation.data

  const existingToken = await getPasswordResetTokenByToken(token)
  if (!existingToken) {
    return { error: "Invalid token!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await updatePassword(existingUser.id, hashedPassword)

  await removePasswordResetToken(existingToken.id)

  return { success: "Password updated!" }
}
