"use client";

import { authenticate, login } from "@/app/actions/auth";
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
import { startAuthentication } from "@simplewebauthn/browser";
import axios from "axios";
import { Fingerprint, Loader2 } from "lucide-react";
import Form from "next/form";
import { useActionState, useState } from "react";

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formState, formAction, formPending] = useActionState(login, undefined);
  const [isBtnPending, setIsBtnPending] = useState(false);

  const handleFPClick = async () => {
    setIsBtnPending(true);

    const response = await axios.get(`/api/webauthn/generate-auth-options`, {
      withCredentials: true,
    });

    const options = response.data;

    const authResponse = await startAuthentication({
      optionsJSON: options,
    });

    const verification = await axios.post(
      "/api/webauthn/verify-auth",
      authResponse,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (verification.data.verified) {
      await authenticate();
      setIsBtnPending(false);
    }
  };

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
          <Form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input name="username" id="username" type="text" required />
                {formState?.errors?.username && (
                  <p>{formState.errors.username}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input name="password" id="password" type="password" required />
                {formState?.errors?.password && (
                  <p>{formState.errors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={formPending}>
                  Login
                </Button>
              </div>
              {formState?.message && (
                <p className="text-red-500">{formState.message}</p>
              )}
            </div>
            <div className="my-6 flex items-center text-sm font-medium text-gray-600">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => handleFPClick()}
                disabled={isBtnPending}
                variant={"outline"}
                type="submit"
                className="w-full cursor-pointer gap-2"
              >
                {isBtnPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Fingerprint />
                )}{" "}
                Continue with Biometric
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
