import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(1, { message: "Please enter a name" })),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.nativeEnum(UserRole),
  email: z.optional(z.string().email({ message: "Please enter a valid email" })),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
}).refine((data) => {
  return !(data.password && !data.newPassword)
}, {
  message: "Please enter a new password",
  path: ["newPassword"],
}).refine(data => {
  return !(data.newPassword && !data.password)
}, {
  message: "Please enter your current password",
  path: ["password"],
}).refine(data => {
  return !(data.password && (data.password === data.newPassword))
}, {
  message: "New password must be different from current password",
  path: ["newPassword"],
})
