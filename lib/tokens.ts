import { addVerificationToken, getVerificationTokenByEmail, removeVerificationToken } from "@/data/verification-token"
import { v4 as uuidV4 } from "uuid"

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await removeVerificationToken(existingToken.id)
  }

  return await addVerificationToken(email, token, expires)
}
