import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { Clothing } from "../../types/clothing";

type Props = {
  clothing: Clothing;
};

const ClothingOption: FC<Props> = ({ clothing: { name } }) => {
  return (
    <Flex align="center" h="100px" borderBottom="solid 2px gray">
      <HamburgerIcon />
      <Box w="80px" h="80px" bgColor="red" borderRadius="50%" />
      <Flex h="100%" direction="column" justify="flex-start" fontSize="20px">
        {name}
      </Flex>
    </Flex>
  );
};

export default ClothingOption;
