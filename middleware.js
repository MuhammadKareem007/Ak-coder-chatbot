import { NextResponse } from "next/server";

export function middleware(req) {
  // ✅ Allow home & static files
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // ✅ Protect dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("firebaseToken")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
