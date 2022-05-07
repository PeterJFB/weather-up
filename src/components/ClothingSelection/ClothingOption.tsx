import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Clothing } from "../../types/clothing";

type Props = {
  clothing: Clothing;
  fireEdit: () => void;
};

const ClothingOption: FC<Props> = ({
  clothing: { name, minTemp, maxTemp },
  fireEdit,
}) => {
  return (
    <Flex
      align="center"
      h="100px"
      borderBottom="solid 2px rgba(20, 20, 20, 30%)"
    >
      <HamburgerIcon w={7} h="full" m="0 15px" />
      <Box w="80px" h="80px" bgColor="red" borderRadius="50%" />
      <Flex
        h="100%"
        direction="column"
        justify="flex-start"
        fontSize="20px"
        ml="10px"
      >
        <Text>{name}</Text>
        <Flex></Flex>
        {minTemp ? <Text fontSize="sm">min: {minTemp}°C</Text> : null}
        {maxTemp ? <Text fontSize="sm">max: {maxTemp}°C</Text> : null}
      </Flex>
      <Spacer />
      <SettingsIcon w={7} h="full" m="0 15px" onClick={fireEdit} />
    </Flex>
  );
};

export default ClothingOption;
