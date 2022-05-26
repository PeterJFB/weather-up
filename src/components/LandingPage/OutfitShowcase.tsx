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
      pos="absolute"
      transformOrigin="center"
      transform="scale(200%)"
      zIndex={zIndex}
      filter="drop-shadow(0 3px 2px rgba(0, 0, 0, 0.4))"
    />
  );

  return (
    <Flex
      w="50%"
      h="fit-content"
      pos="relative"
      filter="drop-shadow(0 10px 12px rgba(0, 0, 0, 0.4))"
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
      />
      {/* {JSON.stringify(outfit)} */}
    </Flex>
  );
};

export default OutfitShowcase;
