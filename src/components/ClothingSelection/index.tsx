import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import React, { ComponentProps, FC, useState } from "react";
import { Clothing, Preferences } from "../../types/clothing";
import {
  extractClothingFromForm,
  getPreferences,
  updateClothing,
} from "../../utils/clothing";
import ClothingOption from "./ClothingOption";
import CreateClothingModal from "./CreateClothingModal";
import EditClothingModal from "./EditClothingModal";

const ClothingSelection: FC = () => {
  const [clothingOptions, setClothingOptions] = useState<
    Preferences["clothingOptions"]
  >(getPreferences().clothingOptions);

  const refreshClothingOptions = () => {
    setClothingOptions(getPreferences().clothingOptions);
  };

  const [selectedClothing, setSelectedClothing] = useState<Clothing>();

  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();

  const editClothing = (clothing: Clothing) => {
    return () => {
      setSelectedClothing(clothing);
      editDisclosure.onOpen();
    };
  };

  const onEdit: ComponentProps<typeof CreateClothingModal>["onSave"] = (
    values
  ) => {
    const clothing = extractClothingFromForm(values);
    updateClothing(clothing, selectedClothing);
    editDisclosure.onClose();
    refreshClothingOptions();
  };

  const onCreate: ComponentProps<typeof CreateClothingModal>["onSave"] = (
    values
  ) => {
    const clothing = extractClothingFromForm(values);
    updateClothing(clothing);
    createDisclosure.onClose();
    refreshClothingOptions();
  };

  return (
    <Flex h="100%" w="full" pos="relative" direction="column">
      <Button
        colorScheme="blue"
        pos="absolute"
        bottom="25px"
        right="20px"
        onClick={createDisclosure.onOpen}
      >
        <PlusSquareIcon mr="10px" /> Add clothing
      </Button>
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
        onSave={onEdit}
      />
      <CreateClothingModal disclosure={createDisclosure} onSave={onCreate} />
    </Flex>
  );
};

export default ClothingSelection;
