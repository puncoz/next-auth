import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import React, { FunctionComponent } from "react"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

type Props = {
  label: string
};

const Header: FunctionComponent<Props> = ({ label }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold",
        font.className,
      )}>
        🔐 NextAuth
      </h1>

      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}

export default Header
