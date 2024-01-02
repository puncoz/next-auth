import { Button } from "@/components/ui/button"
import React, { FunctionComponent } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

type Props = {};

const Social: FunctionComponent<Props> = (props) => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline">
        <FcGoogle className="w-5 h-5"/>
      </Button>

      <Button size="lg" className="w-full" variant="outline">
        <FaGithub className="w-5 h-5"/>
      </Button>
    </div>
  )
}

export default Social
