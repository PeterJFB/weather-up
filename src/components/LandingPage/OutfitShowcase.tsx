import { Flex, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { ClothingType, Outfit } from "../../types/clothing";
import { CLOTHING_MAP } from "./ClothingMap";

type Props = {
  outfit: Outfit;
};

const OutfitShowcase: FC<Props> = ({ outfit }) => {
  const ClothingImg = ({ src, zIndex }: { src: string; zIndex?: number }) => (
    <Image
      src={src}
      maxW="100%"
      minW="100%"
      maxH="100%"
      pos="absolute"
      bottom={0}
      transformOrigin="center"
      transform="scale(200%)"
      fit="contain"
      zIndex={zIndex}
      filter="drop-shadow(0 2px 2px rgba(50, 50, 70, 0.2))"
      pointerEvents="none"
    />
  );

  return (
    <Flex
      w="50%"
      h="fit-content"
      maxH="50%"
      pos="relative"
      filter="drop-shadow(0 10px 12px rgba(0, 0, 0, 0.4))"
      pointerEvents="none"
    >
      {(Object.keys(ClothingType) as (keyof typeof ClothingType)[]).map(
        (c, i) => {
          if (!outfit[c]) return null;
          return (
            <ClothingImg key={c} src={CLOTHING_MAP[c].image} zIndex={i + 1} />
          );
        }
      )}
      <Image
        src="./outfit/person.png"
        maxW="100%"
        minW="100%"
        fit="contain"
        transformOrigin="center"
        transform="scale(200%)"
        zIndex={0}
        pointerEvents="none"
      />
    </Flex>
  );
};

export default OutfitShowcase;
