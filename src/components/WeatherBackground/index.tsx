import React, { FC, TransitionEventHandler } from "react";
import { Box } from "@chakra-ui/react";
import { WeatherData } from "../../types/weather";
import CloudGroup from "./CloudGroup";
type Props = {
  weatherData?: WeatherData;
};

type GradientProps = {
  weatherData?: WeatherData;
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>;
};

const LoadingGradient: FC<GradientProps> = ({ weatherData }) => (
  <Box
    w="full"
    h="100%"
    pos="absolute"
    top={0}
    left={0}
    bgGradient="linear(blue.100, blue.400)"
    transition="1s opacity"
    opacity={weatherData ? "0%" : "100%"}
    zIndex={-1}
  />
);

const WeatherGradient: FC<GradientProps> = ({
  weatherData,
  onTransitionEnd,
}) => (
  <Box
    w="full"
    h="100%"
    pos="absolute"
    top={0}
    left={0}
    bgGradient="linear(green.700, blue.900)"
    transition="1s opacity"
    opacity={weatherData ? "100%" : "0%"}
    zIndex={-1}
    onTransitionEnd={onTransitionEnd}
  />
);

const WeatherBackground: FC<Props> = ({ weatherData }) => {
  return (
    <Box pos="absolute" top={0} left={0} w="full" h="100%" zIndex={-1}>
      <LoadingGradient weatherData={weatherData} />
      <WeatherGradient weatherData={weatherData} />
      {weatherData && <CloudGroup />}
      {/* <chakra.canvas /> */}
    </Box>
  );
};

export default WeatherBackground;
