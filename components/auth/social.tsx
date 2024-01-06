import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import React, { FunctionComponent, useMemo } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

type Props = {};

const Social: FunctionComponent<Props> = (props) => {
  const searchParams = useSearchParams()
  const callBackUrl = useMemo(() => searchParams.get("callbackUrl") || undefined, [searchParams])

  const handleOnClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => handleOnClick("google")}>
        <FcGoogle className="w-5 h-5"/>
      </Button>

      <Button size="lg" className="w-full" variant="outline" onClick={() => handleOnClick("github")}>
        <FaGithub className="w-5 h-5"/>
      </Button>
    </div>
  )
}

export default Social
