"use client"
import { login } from "@/actions/login"
import CardWrapper from "@/components/auth/card-wrapper"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { FunctionComponent, useMemo, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Props = {};

const LoginForm: FunctionComponent<Props> = (props) => {
  const searchParams = useSearchParams()
  const urlError = useMemo(() => {
    const error = searchParams.get("error")

    return error === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : ""
  }, [searchParams])

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper headerLabel="Welcome back"
                 backButtonLabel="Don't have an account?"
                 backButtonHref="/auth/register"
                 showSocials>
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

            <FormField control={form.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                             <Input {...field}
                                    disabled={isPending}
                                    placeholder="********"
                                    type="password"/>
                           </FormControl>
                           <FormMessage/>
                           <Button size="sm" variant="link" asChild className="px-0 font-normal">
                             <Link href={"/auth/forgot-password"}>
                               Forgot password?
                             </Link>
                           </Button>
                         </FormItem>
                       )}/>
          </div>

          <FormError message={error || urlError}/>
          <FormSuccess message={success}/>

          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
