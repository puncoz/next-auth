import BackButton from "@/components/auth/back-button"
import Header from "@/components/auth/header"
import Social from "@/components/auth/social"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import React, { FunctionComponent, ReactNode } from "react"

type Props = {
  children: ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocials?: boolean
};

const CardWrapper: FunctionComponent<Props> = (props) => {
  const { children, backButtonHref, backButtonLabel, headerLabel, showSocials } = props

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>

      {showSocials && (
        <CardFooter>
          <Social/>
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
