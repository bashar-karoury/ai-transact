import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";
const authPathes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  // console.log("pathname = ", request.nextUrl.pathname);
  const isAuthPath = authPathes.includes(request.nextUrl.pathname);

  const user = await stackServerApp.getUser();

  const response = NextResponse.next();

  if (user?.primaryEmail) {
    // Set custom header
    response.headers.set("x-user-email", user.primaryEmail);
  }

  if (!user) {
    if (isAuthPath) {
      return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse("Not authorized", { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !user?.clientMetadata?.onboarded &&
    request.nextUrl.pathname !== "/onboard"
  ) {
    return NextResponse.redirect(new URL("/onboard", request.url));
  }

  return response;
}

export const config = {
  // You can add your own route protection logic here
  // Make sure not to protect the root URL, as it would prevent users from accessing static Next.js files or Stack's /handler path
  //   matcher: ["/((?!_next/static|_next/image|favicon.ico|login|signup|$).*)"],
  matcher: ["/((?!_next/static|_next/image|favicon.ico|$).*)"],
  // matcher: ["/:path*"],
};

// export default function handler() {}
