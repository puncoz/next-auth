import { db } from "@/lib/db"

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findUnique({
      where: { token },
    })
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: { email },
    })
  } catch (error) {
    return null
  }
}

export const removeVerificationToken = async (id: string) => {
  await db.verificationToken.delete({
    where: { id },
  })
}

export const addVerificationToken = async (email: string, token: string, expires: Date) => {
  return db.verificationToken.create({
    data: {
      email, token, expires,
    },
  })
}
