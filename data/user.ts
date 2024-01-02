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