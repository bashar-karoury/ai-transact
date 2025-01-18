import SideBarComponent from '@/Components/SideBarComponent'//'../_SideBarComponent'; 
import {Flex} from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <>
      <Flex>
      <SideBarComponent>{children}</SideBarComponent>
      </Flex>
    </>
  );
}
