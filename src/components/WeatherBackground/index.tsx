import React, { FC, TransitionEventHandler, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { WeatherHourData } from "../../types/weather";
import CloudGroup from "./CloudGroup";
type Props = {
  hourData?: WeatherHourData;
};

type GradientProps = {
  hourData?: WeatherHourData;
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>;
  visible?: boolean;
};

const calculateGradient = (hourData: WeatherHourData) => {
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

  return `linear(hsl(205, ${st}%, ${lt}%), hsl(205, 81%, ${lb}%))`;
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

const WeatherGradient: FC<GradientProps> = ({ hourData }) => {
  const gradient = hourData ? calculateGradient(hourData) : undefined;
  return (
    <Box
      w="full"
      h="100%"
      pos="absolute"
      top={0}
      left={0}
      bgGradient={gradient}
      zIndex={-1}
    />
  );
};

const WeatherToggleGradient: FC<GradientProps> = ({
  hourData,
  onTransitionEnd,
  visible,
}) => {
  const [currentHourData, setCurrentHourData] = useState<WeatherHourData>();

  useEffect(() => {
    if (visible) {
      setCurrentHourData(hourData);
    }
  }, [visible]);

  const gradient = currentHourData
    ? calculateGradient(currentHourData)
    : undefined;

  return (
    <Box
      opacity={visible ? "100%" : "0%"}
      w="full"
      h="100%"
      pos="absolute"
      top={0}
      left={0}
      transition="0.5s opacity"
      bgGradient={gradient}
      // bgGradient="linear(green.700, blue.900)"
      // bgGradient="linear(blue.100, blue.400)"
      zIndex={-1}
      onTransitionEnd={onTransitionEnd}
    />
  );
};

const WeatherBackground: FC<Props> = ({ hourData }) => {
  const [visibleToggle, setVisibleToggle] = useState(true);

  useEffect(() => {
    setVisibleToggle(!visibleToggle);
  }, [hourData]);

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
      <WeatherToggleGradient hourData={hourData} visible={visibleToggle} />
      <WeatherToggleGradient hourData={hourData} visible={!visibleToggle} />
      {hourData ? (
        <CloudGroup cloudAreaFraction={hourData.instant.cloudAreaFraction} />
      ) : null}
    </Box>
  );
};

export default WeatherBackground;
