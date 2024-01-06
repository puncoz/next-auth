"use server"
import { auth } from "@/auth/auth"
import type { ExtendedUser } from "@/next-auth"

export const currentUser = async () => {
  const session = await auth()

  return session?.user as ExtendedUser
}

export const currentRole = async () => {
  const user = await currentUser()

  return user?.role
}
