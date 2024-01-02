import CardWrapper from "@/components/auth/card-wrapper"
import React, { FunctionComponent } from "react"

type Props = {};

const LoginForm: FunctionComponent<Props> = (props) => {
  return (
    <CardWrapper headerLabel="Welcome back"
                 backButtonLabel="Don't have an account?"
                 backButtonHref="/auth/register"
                 showSocials>
      Login form
    </CardWrapper>
  )
}

export default LoginForm
