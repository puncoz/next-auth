"use client"
import { logout } from "@/actions/logout"
import LogoutButton from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import React, { type FunctionComponent } from "react"

type Props = {};

const SettingsPage: FunctionComponent<Props> = (props) => {
  const user = useCurrentUser()

  const handleOnClick = async () => {
    await logout()
  }

  return (
    <div className="bg-white p-10 rounded-xl">
      <Button type="submit" onClick={handleOnClick}>
        Sign out
      </Button>

      <LogoutButton/>
    </div>
  )
}

export default SettingsPage
