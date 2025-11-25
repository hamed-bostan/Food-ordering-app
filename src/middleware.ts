import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";

const redirectToHome = (req: NextRequest) => NextResponse.redirect(new URL("/", req.url));

export async function middleware(req: NextRequest) {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as JWT | null;

  const { pathname } = req.nextUrl;

  // -------------------------------
  // Protect /manage and /create (admin or root only)
  // -------------------------------
  if (pathname.startsWith("/manage") || pathname.startsWith("/create")) {
    if (!token || (token.role !== "admin" && token.role !== "root")) {
      return redirectToHome(req);
    }
  }

  // -------------------------------
  // Protect /userpanel (any logged-in user)
  // -------------------------------
  if (pathname.startsWith("/userpanel") && !token) {
    return redirectToHome(req);
  }

  return NextResponse.next();
}

// -------------------------------
// Middleware matcher
// -------------------------------
export const config = {
  matcher: ["/manage/:path*", "/create/:path*", "/userpanel/:path*"],
};
