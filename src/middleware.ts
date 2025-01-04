import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

const excludePathes = ["/"];

// exlude
export async function middleware(request: NextRequest) {
  console.log("pathname = ", request.nextUrl.pathname);
  if (excludePathes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const user = await stackServerApp.getUser();
  if (!user) {
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse("Not authorized", { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    !user?.clientMetadata?.onboarded &&
    request.nextUrl.pathname !== "/onboard"
  ) {
    return NextResponse.redirect(new URL("/onboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // You can add your own route protection logic here
  // Make sure not to protect the root URL, as it would prevent users from accessing static Next.js files or Stack's /handler path
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|signup).*)"],
  // matcher: ["/:path*"],
};

// export default function handler() {}
