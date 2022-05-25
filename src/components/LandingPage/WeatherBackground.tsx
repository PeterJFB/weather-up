import { Box } from "@chakra-ui/react";
import React, { FC, TransitionEventHandler, useEffect, useState } from "react";
import { WeatherData } from "../../types/weather";
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

const Cloud = ({
  onTransitionEnd,
  show = false,
}: {
  onTransitionEnd: TransitionEventHandler<HTMLDivElement>;
  show: boolean;
}) => (
  <Box
    bgColor="gray.200"
    w="50px"
    h="50px"
    transition="0.5s opacity, 0.5s margin"
    opacity={show ? "100%" : "0%"}
    mt={show ? "0px" : "10px"}
    onTransitionEnd={onTransitionEnd}
  />
);

const CloudGroup = () => {
  const [clouds, setClouds] = useState([false, false, false]);

  useEffect(() => {
    setClouds([true, false, false]);
  }, []);

  const showCloud = (index: number) => () => {
    const c = [...clouds];
    c[index] = true;
    setClouds(c);
  };

  return (
    <Box>
      <Cloud show={clouds[0]} onTransitionEnd={showCloud(1)} />
      <Cloud show={clouds[1]} onTransitionEnd={showCloud(1)} />
    </Box>
  );
};

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
