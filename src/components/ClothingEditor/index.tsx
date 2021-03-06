import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { ComponentProps, FC, useState } from "react";
import { Clothing, Preferences } from "../../types/clothing";
import {
  deleteClothing,
  extractClothingFromForm,
  getPreferences,
  moveClothingPriority,
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

  const editClothing = (clothing: Clothing) => () => {
    setSelectedClothing(clothing);
    editDisclosure.onOpen();
  };

  const moveClothing = (i: number) => (direction: "UP" | "DOWN") => {
    moveClothingPriority(i, direction);
    refreshClothingOptions();
  };

  const onEdit: ComponentProps<typeof EditClothingModal>["onSave"] = (
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

  const onDelete: ComponentProps<typeof EditClothingModal>["onDelete"] = (
    clothing
  ) => {
    deleteClothing(clothing);
    editDisclosure.onClose();
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
        <PlusSquareIcon mr="10px" w="20px" h="20px" />{" "}
        <Text mb="-5px">Add clothing</Text>
      </Button>
      {clothingOptions.map((clothing, i) => (
        <ClothingOption
          key={clothing.name}
          clothing={clothing}
          fireEdit={editClothing(clothing)}
          move={moveClothing(i)}
        />
      ))}
      <EditClothingModal
        disclosure={editDisclosure}
        selectedClothing={selectedClothing}
        onSave={onEdit}
        onDelete={onDelete}
      />
      <CreateClothingModal disclosure={createDisclosure} onSave={onCreate} />
    </Flex>
  );
};

export default ClothingSelection;
