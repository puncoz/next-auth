"use server"

import { updateSession } from "@/auth/auth"
import { getUserByEmail, getUserById, updateUser } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized!" }
  }

  const dbUser = await getUserById(user.id)
  if (!dbUser) {
    return { error: "Unauthorized!" }
  }

  if (user.isOAuthAccount) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  let emailVerified = dbUser.emailVerified
  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email)
    if (existingUser && existingUser.id !== dbUser.id) {
      return { error: "Email already in use!" }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    emailVerified = null
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
    if (!passwordMatch) {
      return { error: "Incorrect current password!" }
    }

    values.password = await bcrypt.hash(values.newPassword, 10)
    values.newPassword = undefined
  }

  const updatedUser = await updateUser(dbUser.id, { ...values, emailVerified })

  await updateSession({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  })

  return { success: "User updated!" }
}
