// import { NextRequest, NextResponse } from "next/server";
// import { stackServerApp } from "./stack";

// export async function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/handler/")) {
//     return NextResponse.next();
//   }
//   const user = await stackServerApp.getUser();
//   if (!user) {
//     if (request.nextUrl.pathname.startsWith("/api/")) {
//       return new NextResponse("Not authorized", { status: 401 });
//     }
//     return NextResponse.redirect(new URL("/handler/sign-in", request.url));
//   }
//   if (!user?.clientMetadata?.onboarded) {
//     return NextResponse.redirect(new URL("/onboard", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   // You can add your own route protection logic here
//   // Make sure not to protect the root URL, as it would prevent users from accessing static Next.js files or Stack's /handler path
//   matcher: ["/protected/:path*", "/api/:path*"],
//   // matcher: ["/:path*"],
// };

export default function handler() {
}