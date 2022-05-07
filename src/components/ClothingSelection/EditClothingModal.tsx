import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React, { FC, useMemo, useState } from "react";
import { Clothing } from "../../types/clothing";

type Props = {
  selectedClothing?: Clothing;
  disclosure: UseDisclosureProps;
  onSave: (prevClothing: Clothing, newClothing: Clothing) => void;
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

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalBody>BODDY</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onSave(selectedClothing, newClothing);
            }}
          >
            Save
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClothingModal;
