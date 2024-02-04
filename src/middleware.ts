import { authMiddleware, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import type { UserRole } from "~/types";

export default authMiddleware({
  // debug: true,
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/sso-callback(.*)",
    "/article(.*)",
    "/articles(.*)",
    "/authors(.*)",
    "/release(.*)",
    "/releases(.*)",
    "/api(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);
    const pathname = req.nextUrl.pathname;

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (pathname.startsWith("/new/release")) {
      if (user.publicMetadata.role !== "admin") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    if (pathname.startsWith("/new/article")) {
      if (user.publicMetadata.role === "user") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    // If the user doesn't have a role, set it to user
    if (!user.publicMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        publicMetadata: {
          role: "user" satisfies UserRole,
        },
      });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
