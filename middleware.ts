import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  // Helper to check if a path is considered "public"
  const isPublicPath = publicPaths.includes(pathname);

  // Identify Next.js internal paths or static assets (these should always be allowed)
  const isNextInternalOrStatic =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/proxy/"); // Allow proxy calls as they internally handle auth

  if (isNextInternalOrStatic) {
    return NextResponse.next();
  }
  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL("/messages", request.url));
  }

  // 2. If we reach here, it means the path is NOT public and NOT an internal/static asset.
  //    Therefore, it's a protected route.
  //    Check if an accessToken exists.
  if (!accessToken && !isPublicPath) {
    console.log(
      `Middleware: Protected path "${pathname}" accessed without access token. Redirecting to /login.`
    );
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. If we reach here, it means:
  //    - The path is protected (not public, not internal).
  //    - An accessToken was found.
  //    Allow the request to proceed.
  //    (Optional: Add server-side token validation here for stronger security)
  //    Refer to previous examples for how to integrate `verifyToken(accessToken)` if needed.

  return NextResponse.next();
}

// Configure the matcher to run middleware on all paths.
// The internal logic will then decide who gets access.
export const config = {
  matcher: [
    /*
     * Match all request paths. The middleware function itself will contain the
     * logic to differentiate between public and protected routes.
     * Excluding specific patterns here (like /api) can be done if you are
     * absolutely sure those specific API routes should *never* be touched by
     * this middleware's logic. However, for a simple "all protected by default"
     * approach, matching all is often simpler, letting the internal `isNextInternalOrStatic`
     * and `isPublicPath` handle exclusions.
     *
     * For this setup, we'll match all, and let `isNextInternalOrStatic`
     * handle `_next/` and static files, and explicitly allowing `/api/proxy`
     * in that check too.
     */
    "/", // Match the root
    "/(.*)", // Match all other paths
  ],
};
