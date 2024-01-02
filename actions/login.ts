"use server"
import { LoginSchema } from "@/schemas"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid email or password" }
  }

  return { success: "Logged in" }
}
