"use client"
import LogoutButton from "@/components/auth/logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { ExitIcon } from "@radix-ui/react-icons"
import React, { FunctionComponent } from "react"
import { FaUser } from "react-icons/fa"

type Props = {};

const UserButton: FunctionComponent<Props> = (props) => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""}/>
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white"/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2"/>
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
