// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];   // หน้า protected
const AUTH_PAGES = ["/login", "/signup"];              // หน้า auth

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // refresh session if expired (important)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.includes(pathname);

  // ยังไม่ล็อกอินแต่เข้าหน้า protected → เด้งไป /login
  if (isProtected && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(url);
  }

  // ล็อกอินแล้ว แต่เข้าหน้า /login หรือ /signup → เด้งไป /dashboard
  if (isAuthPage && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|public).*)",
  ],
};
