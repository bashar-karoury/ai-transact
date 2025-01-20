import SideBarComponent from '@/Components/SideBarComponent'//'../_SideBarComponent'; 
import { ErrorModalProvider } from '@/Components/ModalContext';
export default function Layout({ children }) {
  return (
    <>
      <ErrorModalProvider>
        <SideBarComponent>{children}</SideBarComponent>
      </ErrorModalProvider>
    </>
  );
}
