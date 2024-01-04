import { db } from "@/lib/db"

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findUnique({
      where: { userId },
    })
  } catch (error) {
    return null
  }
}

export const addTwoFactorConfirmation = async (userId: string) => {
  return db.twoFactorConfirmation.create({
    data: {
      userId,
    },
  })
}

export const removeTwoFactorConfirmation = async (id: string) => {
  await db.twoFactorConfirmation.delete({
    where: { id },
  })
}
