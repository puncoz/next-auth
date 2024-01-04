import { db } from "@/lib/db"

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return await db.twoFactorToken.findUnique({
      where: { token },
    })
  } catch (error) {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return await db.twoFactorToken.findFirst({
      where: { email },
    })
  } catch (error) {
    return null
  }
}

export const removeTwoFactorToken = async (id: string) => {
  await db.twoFactorToken.delete({
    where: { id },
  })
}

export const addTwoFactorToken = async (email: string, token: string, expires: Date) => {
  return db.twoFactorToken.create({
    data: {
      email, token, expires,
    },
  })
}
