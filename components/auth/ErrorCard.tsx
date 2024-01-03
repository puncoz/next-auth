import CardWrapper from "@/components/auth/card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import React, { FunctionComponent } from "react"

type Props = {};

const ErrorCard: FunctionComponent<Props> = (props) => {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!"
                 backButtonLabel="Back to login"
                 backButtonHref="/auth/login">
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive"/>
      </div>
    </CardWrapper>
  )
}

export default ErrorCard
