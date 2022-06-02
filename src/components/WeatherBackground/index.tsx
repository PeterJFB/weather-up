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

type CelestialProps = {
  hourData: WeatherHourData;
};

const Sun: FC<CelestialProps> = ({ hourData }) => {
  const hour = hourData.time.getHours();
  const isDayTime = 6 <= hour && hour <= 18;
  return (
    <Box
      w="50px"
      h="50px"
      pos="absolute"
      top={isDayTime ? `${(Math.abs(6 - (hour - 6)) / 6) * 10 + 5}%` : "30%"}
      left={isDayTime ? `${((hour - 6) / 12) * 100}%` : "120%"}
      opacity={isDayTime ? "100%" : "0%"}
      transform="translateX(-50%)"
      bgColor="yellow.200"
      boxShadow="0px 0px 10px yellow"
      borderRadius="50%"
      transition="0.5s all, 0.5s opacity"
      overflow="hidden"
    />
  );
};

const Moon: FC<CelestialProps> = ({ hourData }) => {
  const hour = hourData.time.getHours();
  const isNightTime = hour < 6 || 18 < hour;
  return (
    <Box
      w="50px"
      h="50px"
      pos="absolute"
      top={
        isNightTime
          ? `${(Math.abs(6 - (((hour + 12 - 7) % 12) - 6)) / 6) * 10 + 5}%`
          : "30%"
      }
      left={isNightTime ? `${(((hour + 12 - 7) % 12) / 12) * 100}%` : "-20%"}
      opacity={isNightTime ? "100%" : "0%"}
      transform="translateX(-50%)"
      bgColor="gray"
      boxShadow="0px 0px 10px black"
      borderRadius="50%"
      transition="0.5s all, 0.5s opacity"
      overflow="hidden"
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
        <>
          <Sun hourData={hourData} />
          <Moon hourData={hourData} />
          <CloudGroup cloudAreaFraction={hourData.instant.cloudAreaFraction} />
        </>
      ) : null}
    </Box>
  );
};

export default WeatherBackground;
