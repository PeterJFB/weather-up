import { Flex } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { ENDPOINTS } from "./Endpoints";
import NavBarButton from "./NavBarButton";

type Props = PropsWithChildren<Record<string, never>>;

const NavBar: FC<Props> = () => {
  return (
    <Flex
      justify="space-evenly"
      boxShadow="0px -5px 10px rgba(50, 50, 50, 40%)"
      w="full"
    >
      {ENDPOINTS.map(({ name, icon, location }) => (
        <NavBarButton key={location} location={location} icon={icon}>
          {name}
        </NavBarButton>
      ))}
    </Flex>
  );
};

export default NavBar;
