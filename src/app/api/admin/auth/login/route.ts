import { env } from "@/data/env/server";
import { createSession } from "@/lib/session";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log((await request.json()).access_token);

  const headersList = await headers();
  const token = headersList.get("Authorization");

  console.log(token);

  if (token !== `Bearer ${env.ADMIN_PASSWORD_HASH}`) {
    return NextResponse.json(
      { eror: "Authentication failed" },
      { status: 401 },
    );
  }

  await createSession({ role: "admin" });
  return NextResponse.json({ message: "Success!" }, { status: 200 });
}
