import SideBarComponent from '@/Components/SideBarComponent'//'../_SideBarComponent';

export default function Layout({ children }) {
  return (
    <>
      <SideBarComponent>{children}</SideBarComponent>
    </>
  );
}
