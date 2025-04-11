import { NextRequest, NextResponse } from "next/server";
import { decrypt, sessionCookieHelper } from "./lib/session";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(sessionCookieHelper.name)?.value;
  const token = await decrypt(sessionCookie);

  if (!token || !token.role) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
