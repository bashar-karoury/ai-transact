import SideBarComponent from '../SideBarComponent';

export default function Layout({ children }) {
  return (
    <>
      <SideBarComponent>{children}</SideBarComponent>
    </>
  );
}
