import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React, { FC } from "react";
import generateClothingForm from "./ClothingForm";

type Props = {
  disclosure: UseDisclosureProps;
  onSave: Parameters<typeof generateClothingForm>[0];
};

const CreateClothingModal: FC<Props> = ({ disclosure, onSave }) => {
  const { isOpen, onClose } = useDisclosure(disclosure);

  const CreateClothingForm = generateClothingForm(onSave);

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Clothing</ModalHeader>
        <ModalBody>
          <CreateClothingForm
            clothingOptions={{}}
            clothing={{ name: "Hello" }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateClothingModal;
