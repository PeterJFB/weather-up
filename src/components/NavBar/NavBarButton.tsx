import { Flex, Image } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { Link as ReactLink, useLocation } from "react-router-dom";

type Props = PropsWithChildren<{
  icon: string;
  location: string;
}>;

const NavBarButton: FC<Props> = ({ icon, location, children }) => {
  const currentLocation = useLocation();
  const selected = currentLocation.pathname.endsWith(location);
  return (
    <Flex
      flex={1}
      justify="center"
      align="center"
      direction="column"
      w="100%"
      as={ReactLink}
      to={location}
      // _notFirst={{
      //   borderLeft: "solid 2px rgba(20, 20, 20, 30%)",
      // }}
    >
      <Image
        src={icon + (selected ? "-selected" : "") + ".png"}
        minH="50px"
        maxH="50px"
        filter="drop-shadow(0 3px 2px rgba(42, 67, 101, 0.4))"
      />
      {children}
    </Flex>
  );
};

export default NavBarButton;
