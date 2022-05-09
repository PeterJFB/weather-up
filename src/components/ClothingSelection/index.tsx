import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { Clothing, Preferences } from "../../types/clothing";
import { getPreferences, updateClothing } from "../../utils/clothing";
import ClothingOption from "./ClothingOption";
import EditClothingModal from "./EditClothingModal";

const ClothingSelection: FC = () => {
  const [clothingOptions, setClothingOptions] = useState<
    Preferences["clothingOptions"]
  >(getPreferences().clothingOptions);
  const [selectedClothing, setSelectedClothing] = useState<Clothing>();
  const editDisclosure = useDisclosure();

  const onEditSave = (prevClothing: Clothing, newClothing: Clothing) => {
    updateClothing(prevClothing, newClothing);
    editDisclosure.onClose();
    setClothingOptions(getPreferences().clothingOptions);
  };

  const editClothing = (clothing: Clothing) => {
    return () => {
      editDisclosure.onOpen();
      setSelectedClothing(clothing);
    };
  };

  return (
    <Flex h="100%" w="full" direction="column">
      {Object.keys(clothingOptions).map((name) => (
        <ClothingOption
          key={name}
          clothing={clothingOptions[name]}
          fireEdit={editClothing(clothingOptions[name])}
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
