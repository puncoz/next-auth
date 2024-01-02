import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { FunctionComponent } from "react"

type Props = {
  label: string
  href: string
};

const BackButton: FunctionComponent<Props> = ({ href, label }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton
