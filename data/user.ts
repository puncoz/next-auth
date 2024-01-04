import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch (e) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } })
  } catch (e) {
    return null
  }
}

interface IRegisterUser {
  name: string
  email: string
  password: string
}

export const registerUser = async (data: IRegisterUser) => {
  await db.user.create({ data })
}

export const updateEmailVerified = async (id: string, emailVerified: Date | null) => {
  await db.user.update({
    where: { id },
    data: { emailVerified },
  })
}

export const updatePassword = async (id: string, password: string) => {
  await db.user.update({
    where: { id },
    data: { password },
  })
}
