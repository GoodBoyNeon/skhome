"use client";

import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Form from "next/form";
import { useActionState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to the admin panel</CardTitle>
          <CardDescription>
            Enter your username and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input name="username" id="username" type="text" required />
                {state?.errors?.username && <p>{state.errors.username}</p>}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input name="password" id="password" type="password" required />
                {state?.errors?.password && <p>{state.errors.password}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={pending}>
                  Login
                </Button>
              </div>
              {state?.message && (
                <p className="text-red-500">{state.message}</p>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
