import SideBar from './SideBarComponent'
import { StackProvider } from "@stackframe/stack";
import { stackServerApp } from "../stack";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StackProvider app={stackServerApp}>
          <SideBar>{children}</SideBar>
        </StackProvider>
      </body>
    </html>
  );
}
