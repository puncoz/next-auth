"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { FunctionComponent, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { login } from "../../actions/login"
import { sendResetPasswordLink } from "../../actions/reset-password"
import { ForgotPasswordSchema } from "../../schemas"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import CardWrapper from "./card-wrapper"

type Props = {};

const ForgotPasswordForm: FunctionComponent<Props> = (props) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const submit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      sendResetPasswordLink(values).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper headerLabel="Forgot your password?"
                 backButtonLabel="Back to login"
                 backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                             <Input {...field}
                                    disabled={isPending}
                                    placeholder="john.doe@example.com"
                                    type="email"/>
                           </FormControl>
                           <FormMessage/>
                         </FormItem>
                       )}/>
          </div>

          <FormError message={error}/>
          <FormSuccess message={success}/>

          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ForgotPasswordForm
