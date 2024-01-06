"use client"
import { settings } from "@/actions/settings"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { ExtendedUser } from "@/next-auth"
import { SettingsSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import React, { FunctionComponent, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Props = {
  user: ExtendedUser
};

const SettingsForm: FunctionComponent<Props> = ({ user }) => {
  const { update: updateSession } = useSession()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      role: user.role,
    },
  })

  const saveSettings = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      settings(values).then(data => {
        if (data?.error) {
          setError(data.error)
        }
        if (data?.success) {
          updateSession()
          setSuccess(data.success)
        }
      }).catch(err => setError("Something went wrong!"))
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(saveSettings)}>
        <div className="space-y-4">
          <FormField control={form.control}
                     name="name"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Name</FormLabel>
                         <FormControl>
                           <Input {...field} disabled={isPending}/>
                         </FormControl>
                         <FormMessage/>
                       </FormItem>
                     )}/>

          {!user.isOAuthAccount && (
            <FormField control={form.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                             <Input {...field} type="email" disabled={isPending}/>
                           </FormControl>
                           <FormMessage/>
                         </FormItem>
                       )}/>
          )}

          {!user.isOAuthAccount && (
            <>
              <FormField control={form.control}
                         name="password"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Current Password</FormLabel>
                             <FormControl>
                               <Input {...field} type="password" disabled={isPending}/>
                             </FormControl>
                             <FormMessage/>
                           </FormItem>
                         )}/>

              <FormField control={form.control}
                         name="newPassword"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>New Password</FormLabel>
                             <FormControl>
                               <Input {...field} type="password" disabled={isPending}/>
                             </FormControl>
                             <FormMessage/>
                           </FormItem>
                         )}/>
            </>
          )}

          <FormField control={form.control}
                     name="role"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Role</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                           <FormControl>
                             <SelectTrigger>
                               <SelectValue placeholder="Select a role"/>
                             </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                             <SelectItem value={UserRole.USER}>{UserRole.USER}</SelectItem>
                             <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                           </SelectContent>
                         </Select>
                         <FormMessage/>
                       </FormItem>
                     )}/>

          {!user.isOAuthAccount && (
            <FormField control={form.control}
                       name="isTwoFactorEnabled"
                       render={({ field }) => (
                         <FormItem
                           className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                           <div className="space-y-0.5">
                             <FormLabel>Two factor authentication</FormLabel>
                             <FormDescription>Enable two factor authentication for your account</FormDescription>
                           </div>
                           <FormControl>
                             <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending}/>
                           </FormControl>
                           <FormMessage/>
                         </FormItem>
                       )}/>
          )}
        </div>

        <FormError message={error}/>
        <FormSuccess message={success}/>

        <Button type="submit" className="w-full" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default SettingsForm
