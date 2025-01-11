import { StackProvider } from "@stackframe/stack";
import { stackServerApp } from "../stack";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>
        <StackProvider app={stackServerApp}>
          {children}
        </StackProvider>
      </body>
    </html>
  );
}
