import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin/* except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || token !== process.env.ADMIN_COOKIE_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

// Re-export for legacy compatibility
export { proxy as middleware };
