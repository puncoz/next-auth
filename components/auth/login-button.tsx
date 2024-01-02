"use client"
import { useRouter } from "next/navigation"
import React, { FunctionComponent, ReactNode } from "react"

type Props = {
  children: ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
};

const LoginButton: FunctionComponent<Props> = ({ children, mode = "redirect", asChild }) => {
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return (
      <span>Modal</span>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton
