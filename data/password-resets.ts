import { db } from "../lib/db"

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return await db.passwordResetToken.findUnique({
      where: { token },
    })
  } catch (error) {
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return await db.passwordResetToken.findFirst({
      where: { email },
    })
  } catch (error) {
    return null
  }
}

export const removePasswordResetToken = async (id: string) => {
  await db.passwordResetToken.delete({
    where: { id },
  })
}

export const addPasswordResetToken = async (email: string, token: string, expires: Date) => {
  return db.passwordResetToken.create({
    data: {
      email, token, expires,
    },
  })
}
