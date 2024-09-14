import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    const url = new URL(req.nextUrl.origin);

    if (pathname === "/") {
      console.log("main");

      if (token?.sub) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      } else {
        console.log("red");
        return NextResponse.next();
      }
    }

    if (!token?.sub) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (
      pathname.startsWith("/new/article") ||
      pathname.startsWith("/edit/article")
    ) {
      if (token?.role !== "admin" && token.role !== "writer") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    if (
      pathname.startsWith("/new/release") ||
      pathname.startsWith("/edit/release")
    ) {
      if (token.role !== "admin") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/", "/new/:path*", "/edit/:path", "/dashboard/:path*"],
};
