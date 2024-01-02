"use client"
import CardWrapper from "@/components/auth/card-wrapper"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { FunctionComponent } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Props = {};

const LoginForm: FunctionComponent<Props> = (props) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submit = (values: z.infer<typeof LoginSchema>) => {

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
                                    placeholder="********"
                                    type="password"/>
                           </FormControl>
                           <FormMessage/>
                         </FormItem>
                       )}/>
          </div>

          <FormError message=""/>
          <FormSuccess message=""/>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
