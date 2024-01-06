import SettingsForm from "@/components/auth/settings-form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { currentUser } from "@/lib/auth"
import React, { type FunctionComponent } from "react"

type Props = {};

const SettingsPage: FunctionComponent<Props> = async (props) => {
  const user = await currentUser()

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🛠️️ Settings
        </p>
      </CardHeader>

      <CardContent>
        <SettingsForm user={user}/>
      </CardContent>
    </Card>
  )
}

export default SettingsPage
