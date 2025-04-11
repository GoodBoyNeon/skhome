import { NextRequest, NextResponse } from "next/server";
import { decrypt, sessionCookieHelper } from "./lib/session";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(sessionCookieHelper.name)?.value;
  const token = await decrypt(sessionCookie);

  if (request.nextUrl.pathname === "/admin/login") {
    if (token?.role === "admin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl),
      );
    }
    return NextResponse.next();
  }

  if (!token || token.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
