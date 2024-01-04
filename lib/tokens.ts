import { addTwoFactorToken, getTwoFactorTokenByToken, removeTwoFactorToken } from "@/data/two-factor-token"
import { addVerificationToken, getVerificationTokenByEmail, removeVerificationToken } from "@/data/verification-token"
import crypto from "node:crypto"
import { v4 as uuidV4 } from "uuid"
import { addPasswordResetToken, getPasswordResetTokenByEmail, removePasswordResetToken } from "../data/password-resets"

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await removeVerificationToken(existingToken.id)
  }

  return await addVerificationToken(email, token, expires)
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await removePasswordResetToken(existingToken.id)
  }

  return await addPasswordResetToken(email, token, expires)
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getTwoFactorTokenByToken(email)

  if (existingToken) {
    await removeTwoFactorToken(existingToken.id)
  }

  return await addTwoFactorToken(email, token, expires)
}
