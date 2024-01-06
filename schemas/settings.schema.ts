import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(1, { message: "Please enter a name" })),
  role: z.optional(z.nativeEnum(UserRole)),
})
