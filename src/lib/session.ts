import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import { env } from "@/data/env/server";
import { env as clientEnv } from "@/data/env/client";

const secretKey = env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionCookieHelper = {
  name: string;
  options: Partial<ResponseCookie>;
  duration: number;
};

type SessionPayload = {
  role: "user" | "admin";
};

export const sessionCookieHelper: SessionCookieHelper = {
  name: "session_token",
  options: {
    httpOnly: true,
    secure: clientEnv.NEXT_PUBLIC_BASE_URL === "production",
    sameSite: "lax",
    path: "/",
  },
  duration: 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedKey);
}
export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(payload: SessionPayload) {
  const expires = new Date(Date.now() + sessionCookieHelper.duration);
  const session = await encrypt(payload);

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieHelper.name, session, {
    expires,
    ...sessionCookieHelper.options,
  });
}

export async function verifySession() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(sessionCookieHelper.name);
  const token = cookie?.value;
  const session = await decrypt(token);

  if (!session || !session.role) {
    return redirect("/admin/login");
  }
  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieHelper.name);
}
