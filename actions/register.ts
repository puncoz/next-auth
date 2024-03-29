"use server"
import { getUserByEmail, registerUser } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
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

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(email, verificationToken.token)

  return { success: "Confirmation email sent!" }
}
