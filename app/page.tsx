import LoginButton from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import React, { FunctionComponent } from "react"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

type Props = {};

const HomePage: FunctionComponent<Props> = (props) => {
  return (
    <main className="flex h-full flex-col items-center justify-center
            bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className,
        )}>
          🔐 NextAuth
        </h1>
        <p className="text-white text-lg">
          A simple authentication service.
        </p>

        <LoginButton>
          <Button variant="secondary" size="lg" className="mt-1">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  )
}

export default HomePage
