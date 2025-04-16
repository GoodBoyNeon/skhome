import { env } from "@/data/env/server";
import { env as clientEnv } from "@/data/env/client";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = process.env.ADMIN_USERID ?? "";
  const options = await generateAuthenticationOptions({
    rpID:
      env.NODE_ENV === "production"
        ? clientEnv.NEXT_PUBLIC_DOMAIN
        : "localhost",
    allowCredentials: [
      {
        id: userId,
        transports: ["internal"],
      },
    ],
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "fp-auth-info",
    value: JSON.stringify({
      userId,
      challenge: options.challenge,
    }),
    maxAge: 60 * 60,
  });

  return NextResponse.json(options);
}
