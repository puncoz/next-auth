"use server"
import { getUserByEmail, registerUser } from "@/data/user"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt"
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values)

  if (!validation.success) {
    return { error: "Invalid fields" }
  }

  const { name, email, password } = validation.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await registerUser({
    name,
    email,
    password: hashedPassword,
  })

  return { success: "User registered!" }
}
