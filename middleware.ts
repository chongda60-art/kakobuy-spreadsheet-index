import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname.toLowerCase() === "www.kakobuyspreadsheetindex.com") {
    const url = request.nextUrl.clone();
    url.hostname = "kakobuyspreadsheetindex.com";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
