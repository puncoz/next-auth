"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import React, { FunctionComponent, useMemo, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { resetPassword } from "../../actions/reset-password"
import { ResetPasswordSchema } from "../../schemas"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import CardWrapper from "./card-wrapper"

type Props = {};

const ResetPasswordForm: FunctionComponent<Props> = (props) => {
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams.get("token"), [searchParams])

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const submit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      resetPassword(values, token).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper headerLabel="Enter your new password"
                 backButtonLabel="Back to login"
                 backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                             <Input {...field}
                                    disabled={isPending}
                                    placeholder="*******"
                                    type="password"/>
                           </FormControl>
                           <FormMessage/>
                         </FormItem>
                       )}/>
          </div>

          <FormError message={error}/>
          <FormSuccess message={success}/>

          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ResetPasswordForm
