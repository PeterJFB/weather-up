import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { Link as ReactLink } from "react-router-dom";

type Props = PropsWithChildren<{
  icon: string;
  location: string;
}>;

const NavBarButton: FC<Props> = ({ icon, location, children }) => {
  return (
    <Flex
      flex={1}
      justify="center"
      align="center"
      direction="column"
      w="100%"
      as={ReactLink}
      to={location}
    >
      <Image src={icon} backgroundColor="red" minH="50px" maxH="50px" />
      {children}
    </Flex>
  );
};

export default NavBarButton;
