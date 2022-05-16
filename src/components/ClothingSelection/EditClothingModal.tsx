import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React, { FC, useMemo, useState } from "react";
import { Clothing } from "../../types/clothing";
import generateClothingForm from "./ClothingForm";

type Props = {
  selectedClothing?: Clothing;
  disclosure: UseDisclosureProps;
  onSave: Parameters<typeof generateClothingForm>[0];
};

const EditClothingModal: FC<Props> = ({
  selectedClothing,
  disclosure,
  onSave,
}) => {
  const { isOpen, onClose } = useDisclosure(disclosure);

  const [newClothing, setNewClothing] = useState<Clothing | undefined>(
    selectedClothing
  );

  useMemo(() => {
    setNewClothing(selectedClothing);
  }, [selectedClothing]);

  if (!selectedClothing || !newClothing) return null;

  const { name } = newClothing;

  const EditClothingForm = generateClothingForm(onSave);

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditClothingForm clothingOptions={{}} clothing={selectedClothing} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditClothingModal;
