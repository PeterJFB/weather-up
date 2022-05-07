import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { Clothing, ClothingType } from "../../types/clothing";
import ClothingOption from "./ClothingOption";
import EditClothingModal from "./EditClothingModal";

const ClothingSelection: FC = () => {
  const clothingOptions: Clothing[] = [
    {
      name: "Sweater",
      type: ClothingType.SWEATER,
    },
    {
      name: "T-Shirt",
      type: ClothingType.TOP,
      minTemp: 20,
    },
  ];

  const [selectedClothing, setSelectedClothing] = useState<Clothing>();
  const editDisclosure = useDisclosure();

  const onEditSave = (prevClothing: Clothing, newClothing: Clothing) => {
    console.log(newClothing);
    editDisclosure.onClose();
  };

  const editClothing = (clothing: Clothing) => {
    return () => {
      editDisclosure.onOpen();
      setSelectedClothing(clothing);
    };
  };

  return (
    <Flex h="100%" w="full" direction="column">
      {clothingOptions.map((clothing) => (
        <ClothingOption
          key={clothing.name}
          clothing={clothing}
          fireEdit={editClothing(clothing)}
        />
      ))}
      <EditClothingModal
        disclosure={editDisclosure}
        selectedClothing={selectedClothing}
        onSave={onEditSave}
      />
    </Flex>
  );
};

export default ClothingSelection;
