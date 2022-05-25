import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";

type Props = PropsWithChildren<{
  icon: string;
  location: string;
}>;

const NavBarButton: FC<Props> = ({ icon, location, children }) => {
  const currentLocation = useLocation();
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
      {/* <Image src={icon} backgroundColor="red" minH="50px" maxH="50px" /> */}
      {currentLocation.pathname.endsWith(location) ? (
        <InfoIcon h="40px" w="40px" mt="10px" color="primary" />
      ) : (
        <InfoOutlineIcon h="40px" w="40px" mt="10px" color="primary" />
      )}
      {children}
    </Flex>
  );
};

export default NavBarButton;
