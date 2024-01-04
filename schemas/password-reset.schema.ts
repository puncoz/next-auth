import * as z from "zod"

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
})

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})
