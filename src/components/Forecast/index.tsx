import { Flex, Text, useTheme } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { WeatherData, WeatherHourData } from "../../types/weather";
import BaufortArrow from "./BaufortArrow";

type Props = {
  weatherData: WeatherData;
  setHourData: React.Dispatch<
    React.SetStateAction<WeatherHourData | undefined>
  >;
  hourTime?: number;
};

const Forecast: FC<Props> = ({ weatherData, setHourData, hourTime }) => {
  const theme = useTheme();
  const TEMPERATURES = [-6, 0, 6, 12, 18, 24, 30];
  const TEMP_MAX = TEMPERATURES[TEMPERATURES.length - 1];
  const PERCIPITATIONS = [0, 2, 4, 6, 8, 10, 12];
  const NUM_OF_HOURS = 12;
  const SPACING_X = 9;
  const SPACING_Y = 1.25;
  const GRAPH_WIDTH = (NUM_OF_HOURS - 1) * SPACING_X;
  const GRAPH_HEIGHT =
    (TEMPERATURES[TEMPERATURES.length - 1] - TEMPERATURES[0]) * SPACING_Y;

  let ticklinesPath = "";

  // Vertical Ticklines - Time
  for (let i = 0; i < NUM_OF_HOURS; i++) {
    ticklinesPath += `M${i * SPACING_X} 0 V${
      (TEMPERATURES[TEMPERATURES.length - 1] - TEMPERATURES[0]) * SPACING_Y
    }`;
  }

  // Horizontal Ticklines - Measurements (temperature, wind speed etc.)
  for (let i = 0; i < TEMPERATURES.length; i++) {
    ticklinesPath += `M0 ${(-TEMPERATURES[i] + TEMP_MAX) * SPACING_Y} H${
      (NUM_OF_HOURS - 1) * SPACING_X
    }`;
  }

  // Temperature lines using cubic bezier
  let tempPath = `M0 ${
    (-weatherData.byHour[0].instant.airTemperature + TEMP_MAX) * SPACING_Y
  } C`;
  for (let i = 1; i < NUM_OF_HOURS; i++) {
    const prev = -weatherData.byHour[i - 1].instant.airTemperature + TEMP_MAX;
    const next = -weatherData.byHour[i].instant.airTemperature + TEMP_MAX;

    tempPath += `${(i - 1) * SPACING_X + 6} ${prev * SPACING_Y}, ${
      i * SPACING_X - 6
    } ${next * SPACING_Y}, ${i * SPACING_X} ${next * SPACING_Y},`;
  }

  const percipitationRects = [];

  for (let i = 0; i < NUM_OF_HOURS; i++) {
    const spanData = weatherData.byHour[i].next1Hours;
    if (!spanData?.percipitationAmount) continue;

    const { percipitationAmount } = spanData;

    if (percipitationAmount < 0.2) continue;

    const height =
      ((percipitationAmount * (TEMPERATURES[1] - TEMPERATURES[0])) / 2) *
      SPACING_Y;

    percipitationRects.push(
      <rect
        key={i}
        width={SPACING_X}
        height={height}
        x={i * SPACING_X}
        y={GRAPH_HEIGHT - height}
        fill={theme.colors.blue["500"]}
        opacity="50%"
      />
    );
  }

  const graph = (
    <svg
      version="1.1" // Necessary?
      xmlns="http://www.w3.org/2000/svg"
      //   width={NUM_OF_HOURS * 10}
      height="100%"
      viewBox={`-0.5 -0.25 ${GRAPH_WIDTH + 0.25} ${GRAPH_HEIGHT + 0.25}`}
    >
      {/* GRIDLINES */}
      <path
        d={ticklinesPath}
        stroke="gray"
        strokeWidth="0.2px"
        fill="transparent"
      />
      {/* TEMPERATURE-LINE */}
      <path d={tempPath} stroke="red" strokeWidth="1px" fill="transparent" />
      {percipitationRects}
    </svg>
  );

  const HourTickText: FC<{ index: number }> = ({ index }) => (
    <Text
      cursor="pointer"
      textAlign="center"
      width="20px"
      fontSize="xs"
      key={weatherData.byHour[index].time.getTime()}
      _first={{ w: "25px", ml: "-12.5px", mr: "-2.5px" }}
      _last={{ mr: "-10px" }}
      bgColor={
        weatherData.byHour[index].time.getTime() === hourTime
          ? "secondary"
          : "none"
      }
      borderRadius="5px"
      boxShadow="md"
      onClick={() => {
        setHourData(weatherData.byHour[index]);
      }}
    >
      {index === 0 && "Now"}
      {index > 0 &&
        weatherData.byHour[index].time.getHours().toString().padStart(2, "0")}
    </Text>
  );

  return (
    <Flex direction="column" w="fit-content" h="fit-content" mt="-5px">
      <Flex w="100%">
        <Flex w="25px" mr="4px" pointerEvents="none" />
        <Flex flex="auto" justify="space-between">
          {/* HOUR-TICKS */}
          {weatherData.byHour.slice(0, NUM_OF_HOURS).map((hourData, i) => (
            <HourTickText index={i} key={hourData.time.getTime()} />
          ))}
        </Flex>
        <Flex width="40px" fontSize="xs" pointerEvents="none" />
      </Flex>
      <Flex flex={1} maxH="100%" maxW="100%" w="fit-content" h="fit-content">
        {/* TEMPERATURE-TICKS */}
        <Flex direction="column" h="125px" justify="space-between">
          <Text textAlign="right" h="18px" fontSize="xs" w="25px" mt="-9px" />
          {TEMPERATURES.slice(0, TEMPERATURES.length - 1)
            .reverse()
            .map((temp) => (
              <Text
                textAlign="right"
                mr="4px"
                h="18px"
                fontSize="xs"
                key={temp}
                w="25px"
                _last={{ mb: "-9px" }}
              >
                {temp}°
              </Text>
            ))}
        </Flex>
        <Flex h="125px" w="100%">
          {graph}
        </Flex>
        <Flex direction="column" h="125px" justify="space-between">
          <Text textAlign="right" h="18px" fontSize="xs" w="25px" mt="-9px" />
          {PERCIPITATIONS.slice(0, PERCIPITATIONS.length - 1)
            .reverse()
            .map((per) => (
              <Text
                textAlign="right"
                h="18px"
                fontSize="xs"
                key={per}
                w="40px"
                _last={{ mb: "-9px" }}
              >
                {per} mm
              </Text>
            ))}
        </Flex>
      </Flex>
      <Flex w="100%">
        <Flex w="25px" mr="4px" />
        <Flex flex="auto" justify="space-between">
          {weatherData.byHour.slice(0, NUM_OF_HOURS).map((hourData, i) => (
            <BaufortArrow
              key={hourData.time.getTime()}
              windSpeed={hourData.instant.windSpeed}
              fromDirection={hourData.instant.windFromDirection}
            />
          ))}
        </Flex>
        <Flex width="40px" fontSize="xs" />
      </Flex>
    </Flex>
  );
};

export default Forecast;
