"use server"

import { signOut } from "@/auth/auth"

export const logout = async () => {
  await signOut()
}
