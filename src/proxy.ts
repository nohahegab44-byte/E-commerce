// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  try {
    // فك التوكن من الكوكيز
    const jwt = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET, // لازم نفس الـ secret اللي في NextAuth config
    });

    console.log("MIDDLEWARE JWT 👉", jwt);

    // لو مفيش توكن → redirect لل-login
    if (!jwt) {
      console.log(" JWT NOT DECODED - redirecting to login");
      // استخدمي نفس origin بدل ما تحطي localhost ثابت
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }else {
    console.log(" JWT DECODED in Middleware:", jwt);
  }

    // لو موجود توكن → استمر في الصفحة
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// الصفحات اللي عايزة تحميها
export const config = {
  matcher: [
    "/shop",
    "/cart",
    "/favorites",
    "/profile",
    "/checkout",
    "/orders",
    "/orderdetails/:path*",
  ],
};