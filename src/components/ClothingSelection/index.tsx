import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { Clothing, ClothingType } from "../../types/clothing";
import ClothingOption from "./ClothingOption";

const ClothingSelection: FC = () => {
  const clothingOptions: Clothing[] = [
    {
      name: "Sweater",
      type: ClothingType.SWEATER,
    },
    {
      name: "Sweater",
      type: ClothingType.SWEATER,
    },
  ];

  return (
    <Flex h="100%" w="full" direction="column">
      {clothingOptions.map((clothing) => (
        <ClothingOption key={clothing.name} clothing={clothing} />
      ))}
    </Flex>
  );
};

export default ClothingSelection;
