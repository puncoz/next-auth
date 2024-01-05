"use client"
import UserInfo from "@/components/auth/user-info"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import React, { FunctionComponent } from "react"

type Props = {};

const ClientPage: FunctionComponent<Props> = (props) => {
  const user = useCurrentUser()

  return (
    <UserInfo label="📱 User Info (Client component)" user={user}/>
  )
}

export default ClientPage
