import React, { FC } from "react";
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { Clothing } from "../../types/clothing";
import { CLOTHING_MAX_TEMP, CLOTHING_MIN_TEMP } from "../../utils/clothing";
import { CLOTHING_MAP } from "../LandingPage/ClothingMap";

type Props = {
  clothing: Clothing;
  fireEdit: () => void;
  move: (direction: "UP" | "DOWN") => void;
};

const ClothingOption: FC<Props> = ({
  clothing: { name, minTemp, maxTemp, type, rainproof, windproof },
  fireEdit,
  move,
}) => {
  const showMinTemp = () => {
    return minTemp && minTemp > CLOTHING_MIN_TEMP;
  };
  const showMaxTemp = () => {
    return maxTemp && maxTemp < CLOTHING_MAX_TEMP;
  };
  return (
    <Flex
      align="center"
      h="100px"
      borderBottom="solid 2px rgba(20, 20, 20, 30%)"
    >
      {/* <DragHandleIcon w={7} h="full" m="0 15px" /> */}
      <Flex direction="column" h="full" m="0 5px" justify="space-evenly">
        <ChevronUpIcon
          w={9}
          h={9}
          onClick={() => {
            move("UP");
          }}
        />
        <ChevronDownIcon
          w={9}
          h={9}
          onClick={() => {
            move("DOWN");
          }}
        />
      </Flex>
      <Flex
        w="80px"
        h="80px"
        bgColor="secondary"
        borderRadius="50%"
        align="center"
        justify="center"
        pos="relative"
      >
        <Image
          pos="absolute"
          src="./outfit/person-blank.png"
          maxH="100%"
          opacity="75%"
          transform="scale(200%)"
          pointerEvents="none"
        />
        <Image
          src={CLOTHING_MAP[type].image}
          transform="scale(200%)"
          pointerEvents="none"
        />
      </Flex>
      <Flex
        h="100%"
        direction="column"
        justify="flex-start"
        fontSize="20px"
        ml="10px"
      >
        <Text>{name}</Text>
        <Text>
          {rainproof ? "🌧️" : null}
          {windproof ? "💨" : null}
        </Text>
        <Text fontSize="sm">
          {showMinTemp() && showMaxTemp() ? (
            <>
              {minTemp}°C to {maxTemp}°C
            </>
          ) : (
            <>
              {showMinTemp() ? <>min {minTemp}°C</> : null}
              {showMaxTemp() ? <>max {maxTemp}°C</> : null}
            </>
          )}

          {}
        </Text>
      </Flex>
      <Spacer />
      <SettingsIcon w={7} h="full" m="0 15px" onClick={fireEdit} />
    </Flex>
  );
};

export default ClothingOption;
