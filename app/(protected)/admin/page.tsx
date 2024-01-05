"use client"
import { admin } from "@/actions/admin"
import RoleGate from "@/components/auth/role-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import React, { FunctionComponent } from "react"
import { toast } from "sonner"

type Props = {};

const AdminClientPage: FunctionComponent<Props> = (props) => {
  const role = useCurrentRole()

  const handleOnServerActionClick = async () => {
    admin().then(data => {
      if (data.error) {
        toast.error(data.error)
      }

      if (data.success) {
        toast.success(data.success)
      }
    })
  }

  const handleOnApiRouteClick = async () => {
    const response = await fetch("/api/admin")

    if (response.ok) {
      toast.success("🎉 Admin API Route Called!")
    } else {
      toast.error("❌ Forbidden Admin API Route!")
    }
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔑 Admin
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          Current role: {role}
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>

          <Button onClick={handleOnApiRouteClick}>
            Click to test
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>

          <Button onClick={handleOnServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminClientPage
