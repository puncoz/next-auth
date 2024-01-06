"use client"
import LoginForm from "@/components/auth/login-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
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
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>

        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton
