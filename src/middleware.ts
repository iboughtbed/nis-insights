import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;

  const url = new URL(req.nextUrl.origin);

  console.log({ token });

  if (!token?.sub) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/new/article")) {
    if (token?.role !== "ADMIN" && token.role !== "WRITER") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/new/release")) {
    if (token.role !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: ["/new/:path*", "/dashboard/:path*"],
};
