import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const start = Date.now();
  const response = NextResponse.next();

  const duration = Date.now() - start;
  const method = request.method;
  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  console.log(
    `[${new Date().toISOString()}] ${method} ${path}${search} - ${duration}ms`
  );

  response.headers.set("x-request-duration", `${duration}ms`);
  response.headers.set("x-request-path", path);

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
