import { signOut } from "@/auth/auth"
import { Button } from "@/components/ui/button"
import React from "react"

type Props = {};

const SettingsPage = async (props: Props) => {
  return (
    <div className="h-screen bg-slate-800 text-white">
      <form action={async () => {
        "use server"

        await signOut()
      }}>
        <Button type="submit">
          Sign out
        </Button>
      </form>
    </div>
  )
}

export default SettingsPage
