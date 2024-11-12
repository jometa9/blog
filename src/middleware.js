import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = process.env.TOKEN_SESSION;
    const authToken =
      req.cookies.get("authToken")?.value || req.cookies["authToken"];
    if (authToken !== token) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}
