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

  // Protect /dashboard (admin only)
  if (pathname.startsWith("/dashboard")) {
    if (!token || token.role !== "admin") {
      return redirectToHome(req);
    }
  }

  // Protect /admin (admin only)
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return redirectToHome(req);
    }
  }

  // Protect /userPanel (any logged-in user)
  if (pathname.startsWith("/userpanel")) {
    if (!token) {
      return redirectToHome(req);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/userpanel/:path*"],
};
