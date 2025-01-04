import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signUp: "/signup",
    signIn: "/login",
    afterSignIn: "/dashboard",
    afterSignUp: "/onboard",
    afterSignOut: "/",
  },
});
