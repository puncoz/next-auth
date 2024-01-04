import EmailVerificationForm from "@/components/auth/email-verification-form"
import React, { FunctionComponent } from "react"

type Props = {};

const EmailVerifyPage: FunctionComponent<Props> = (props) => {
  return (
    <EmailVerificationForm/>
  )
}

export default EmailVerifyPage
