import * as z from "zod"

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6),
  name: z.string().min(1, { message: "Please enter a name" }),
})
