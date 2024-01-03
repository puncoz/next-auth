import { auth, signOut } from "@/auth/auth"
import { Button } from "@/components/ui/button"
import React from "react"

type Props = {};

const SettingsPage = async (props: Props) => {
  const session = await auth()

  return (
    <div className="h-screen bg-slate-800 text-white">
      {JSON.stringify(session)}
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
