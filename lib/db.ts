import { PrismaClient } from "@prisma/client"

declare global {
  // noinspection ES6ConvertVarToLetConst
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}
