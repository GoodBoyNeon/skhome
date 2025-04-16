import { env } from "@/data/env/server";
import { env as clientEnv } from "@/data/env/client";
import { AuthenticationResponseJSON } from "@simplewebauthn/browser";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

let counter = 0;

export async function POST(request: NextRequest) {
  const resp = (await request.json()) as AuthenticationResponseJSON;

  const authInfo = JSON.parse(request.cookies.get("fp-auth-info")?.value ?? "");

  const { verified, authenticationInfo } = await verifyAuthenticationResponse({
    response: resp,
    expectedChallenge: (authInfo.challenge as string) ?? "",
    credential: {
      id: process.env.ADMIN_USERID ?? "",
      publicKey: Uint8Array.from(
        JSON.parse(process.env.ADMIN_PUBLIC_KEY_ARR ?? ""),
      ),
      transports: ["internal"],
      counter,
    },
    expectedOrigin:
      env.NODE_ENV === "production"
        ? clientEnv.NEXT_PUBLIC_BASE_URL
        : "http://localhost:3000",
    expectedRPID:
      env.NODE_ENV === "production"
        ? clientEnv.NEXT_PUBLIC_DOMAIN
        : "localhost",
  });

  if (verified) {
    counter = authenticationInfo.newCounter;
  } else {
    return NextResponse.json({ error: "Not verified" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.delete("fp-auth-info");

  return NextResponse.json({ verified, authenticationInfo });
}
