import SideBarComponent from '../SideBarComponent';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SideBarComponent>{children}</SideBarComponent>
      </body>
    </html>
  );
}
