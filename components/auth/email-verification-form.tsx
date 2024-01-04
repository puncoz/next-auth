"use client"
import { verifyToken } from "@/actions/verification"
import CardWrapper from "@/components/auth/card-wrapper"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { useSearchParams } from "next/navigation"
import React, { FunctionComponent, useCallback, useEffect, useMemo } from "react"
import { BeatLoader } from "react-spinners"

type Props = {};

const EmailVerificationForm: FunctionComponent<Props> = (props) => {
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams.get("token"), [searchParams])

  const [error, setError] = React.useState<string>()
  const [success, setSuccess] = React.useState<string>()

  const handleVerification = useCallback(async () => {
    if (!token) {
      setError("Missing token!")
      return
    }

    try {
      const result = await verifyToken(token)
      setSuccess(result.success)
      setError(result.error)
    } catch (err) {
      setError("Something went wrong!")
    }
  }, [error, success, token])

  useEffect(() => {
    handleVerification().then()
  }, [handleVerification])

  return (
    <CardWrapper headerLabel="Confirming your verification."
                 backButtonLabel="Back to login"
                 backButtonHref="/auth/login">
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#36d7b7"/>}

        <FormSuccess message={success}/>
        <FormError message={error}/>
      </div>
    </CardWrapper>
  )
}

export default EmailVerificationForm
