import SideBarComponent from '../SideBarComponent';

export default function RootLayout({ children }) {
  return (
    <>
      <SideBarComponent>{children}</SideBarComponent>
    </>
  );
}
