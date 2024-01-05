"use server"
import { auth } from "@/auth/auth"

export const currentUser = async () => {
  const session = await auth()

  return session?.user
}
