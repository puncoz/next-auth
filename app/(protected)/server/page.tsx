import UserInfo from "@/components/auth/user-info"
import { currentUser } from "@/lib/auth"
import React, { type FunctionComponent } from "react"

type Props = {};

const ServerPage: FunctionComponent<Props> = async (props) => {
  const user = await currentUser()

  return (
    <UserInfo user={user} label="💻 User Info (Server component)"/>
  )
}

export default ServerPage
