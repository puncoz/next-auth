"use client"
import { logout } from "@/actions/logout"
import React, { FunctionComponent, type ReactNode } from "react"

type Props = {
  children?: ReactNode
};

const LogoutButton: FunctionComponent<Props> = ({ children }) => {
  const handleOnClick = async () => {
    await logout()
  }

  return (
    <span onClick={handleOnClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LogoutButton
