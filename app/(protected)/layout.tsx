import ProtectedNavbar from "@/app/(protected)/_components/navbar"
import { auth } from "@/auth/auth"
import { SessionProvider } from "next-auth/react"
import React, { FunctionComponent, type ReactNode } from "react"

type Props = {
  children: ReactNode
};

const ProtectedLayout: FunctionComponent<Props> = async ({ children }) => {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center
            bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <ProtectedNavbar/>
        {children}
      </div>
    </SessionProvider>
  )
}

export default ProtectedLayout
