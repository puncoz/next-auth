"use server"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid email or password" }
  }

  return { success: "Logged in" }
}
