import { StackProvider } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Leckerli+One&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <StackProvider app={stackServerApp}>
          {children}
        </StackProvider>
      </body>
    </html >
  );
}
