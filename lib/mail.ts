import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/verify?token=${token}`

  await resend.emails.send({
    from: "no-reply@resend.dev",
    to: email,
    subject: "Please confirm your account",
    html: `<p><a href="${confirmLink}">Click here</a> to confirm your account</p>`,
  })
}
