"use client"
import UserButton from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { FunctionComponent } from "react"

type Props = {};

const ProtectedNavbar: FunctionComponent<Props> = (props) => {
  const pathname = usePathname()

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button size="sm" asChild variant={pathname === "/server" ? "default" : "outline"}>
          <Link href={"/server"}>Server</Link>
        </Button>

        <Button size="sm" asChild variant={pathname === "/client" ? "default" : "outline"}>
          <Link href={"/client"}>Client</Link>
        </Button>

        <Button size="sm" asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href={"/admin"}>Admin</Link>
        </Button>

        <Button size="sm" asChild variant={pathname === "/settings" ? "default" : "outline"}>
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>

      <UserButton/>
    </nav>
  )
}

export default ProtectedNavbar
