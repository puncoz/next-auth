"use server"
import * as z from "zod"
import { getUserByEmail } from "../data/user"
import { sendPasswordResetEmail } from "../lib/mail"
import { generatePasswordResetToken } from "../lib/tokens"
import { ForgotPasswordSchema } from "../schemas"

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
