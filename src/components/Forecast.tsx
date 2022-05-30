import { Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { WeatherData } from "../types/weather";

type Props = {
  weatherData: WeatherData;
};

const Forecast: FC<Props> = ({ weatherData }) => {
  const TEMPERATURES = [-6, 0, 6, 12, 18, 24, 30];
  const TEMP_MAX = TEMPERATURES[TEMPERATURES.length - 1];
  const NUM_OF_HOURS = 12;
  const SPACING_X = 10;
  const SPACING_Y = 1.25;

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

  const graph = (
    <svg
      version="1.1" // Necessary?
      xmlns="http://www.w3.org/2000/svg"
      //   width={NUM_OF_HOURS * 10}
      height="100%"
      viewBox={`0 -0.25 ${(NUM_OF_HOURS - 1) * SPACING_X + 0.25} ${
        (TEMPERATURES[TEMPERATURES.length - 1] - TEMPERATURES[0]) * SPACING_Y +
        0.25
      }`}
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
    </svg>
  );

  return (
    <Flex direction="column" w="fit-content" h="fit-content" mt="-5px">
      <Flex direction="column" align="center" w="100%">
        <Flex w="100%">
          <Flex w="25px" mr="4px"></Flex>
          <Flex flex="auto" justify="space-between">
            {/* HOUR-TICKS */}
            <Text
              width="20px"
              textAlign="center"
              fontSize="xs"
              whiteSpace="nowrap"
              ml="-10px"
            >
              Now
            </Text>
            {weatherData.byHour.slice(1, NUM_OF_HOURS).map((hourData) => (
              <Text
                textAlign="center"
                width="20px"
                fontSize="xs"
                key={hourData.time.getTime()}
                _last={{ mr: "-10px" }}
              >
                {hourData.time.getHours().toString().padStart(2, "0")}
              </Text>
            ))}
          </Flex>
          {/* <Flex mr="-10px" width="20px" fontSize="xs" /> */}
        </Flex>
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
      </Flex>
    </Flex>
  );
};

export default Forecast;
