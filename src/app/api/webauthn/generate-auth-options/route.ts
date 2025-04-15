import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = process.env.ADMIN_USERID ?? "";
  const options = await generateAuthenticationOptions({
    rpID: "localhost",
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
