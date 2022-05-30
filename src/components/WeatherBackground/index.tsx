import React, { FC, TransitionEventHandler } from "react";
import { Box } from "@chakra-ui/react";
import { WeatherHourData } from "../../types/weather";
import CloudGroup from "./CloudGroup";
type Props = {
  hourData?: WeatherHourData;
};

type GradientProps = {
  hourData?: WeatherHourData;
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>;
};

const LoadingGradient: FC<GradientProps> = ({ hourData }) => (
  <Box
    w="full"
    h="100%"
    pos="absolute"
    top={0}
    left={0}
    bgGradient="linear(blue.100, blue.400)"
    transition="1s opacity"
    opacity={hourData ? "0%" : "100%"}
    zIndex={-1}
  />
);

const WeatherGradient: FC<GradientProps> = ({ hourData, onTransitionEnd }) => {
  const lt = (
    (1 - Math.abs(hourData ? (hourData.time.getHours() - 12) / 12 : 1)) *
    100
  ).toPrecision(3);

  const st =
    (0.5 -
      Math.abs(
        0.5 -
          (1 - Math.abs(hourData ? (hourData.time.getHours() - 12) / 12 : 1))
      )) *
    70;

  const lb =
    (1 - Math.abs(hourData ? (hourData.time.getHours() - 12) / 12 : 1)) * 60;

  // console.log(hourData?.time.getHours(), st, lt);

  const gradient = `linear(hsl(205, ${st}%, ${lt}%), hsl(205, 81%, ${lb}%))`;
  return (
    <Box
      w="full"
      h="100%"
      pos="absolute"
      top={0}
      left={0}
      transition="1s opacity, 2s linear background-image"
      bgGradient={gradient}
      // bgGradient="linear(green.700, blue.900)"
      // bgGradient="linear(blue.100, blue.400)"
      opacity={hourData ? "100%" : "0%"}
      zIndex={-1}
      onTransitionEnd={onTransitionEnd}
    />
  );
};

const WeatherBackground: FC<Props> = ({ hourData }) => {
  return (
    <Box
      pos="absolute"
      top={0}
      left={0}
      w="full"
      h="100%"
      zIndex={-1}
      overflowX="hidden"
    >
      <LoadingGradient hourData={hourData} />
      <WeatherGradient hourData={hourData} />
      {hourData ? (
        <CloudGroup cloudAreaFraction={hourData.instant.cloudAreaFraction} />
      ) : null}
      {/* <chakra.canvas /> */}
    </Box>
  );
};

export default WeatherBackground;
