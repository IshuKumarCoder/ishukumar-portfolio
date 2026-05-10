import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (
    isAdminRoute &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }

    try {
      await verifyToken(token);
    } catch {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};