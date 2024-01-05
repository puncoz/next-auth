"use client"
import FormError from "@/components/form-error"
import { useCurrentRole } from "@/hooks/useCurrentRole"
import type { UserRole } from "@prisma/client"
import React, { FunctionComponent, type ReactNode } from "react"

type Props = {
  allowedRole: UserRole
  children: ReactNode
};

const RoleGate: FunctionComponent<Props> = ({ allowedRole, children }) => {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!"/>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default RoleGate
