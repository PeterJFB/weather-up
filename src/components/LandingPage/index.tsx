import React, { FC, PropsWithChildren, useMemo } from "react";
import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { fetchWeater } from "../../utils/weather";
import { WeatherData } from "../../types/weather";
import { getSuitableOutfit } from "../../core/WeatherUp";
import { ClothingType } from "../../types/clothing";
import wData from "../../utils/local/fixture-normalized.json";
import WeatherBackground from "../WeatherBackground";
import OutfitShowcase from "./OutfitShowcase";
import { CLOTHING_MAP } from "./ClothingMap";
import Loading from "../Loading";

const WeatherDisplay: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  // wData as WeatherData
  const [hasGeolocationPermission, setHasGeolocationPermission] =
    useState(true);

  const outfit = useMemo(
    () => (weatherData ? getSuitableOutfit(weatherData.byHour[0]) : undefined),
    [weatherData]
  );

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     (async () => {
    //       // const { error, data } = await fetchWeater(latitude, longitude);
    //       // if (!error && data) {
    //       //   setWeatherData(data);
    //       // }
    setTimeout(() => {
      setWeatherData(wData);
    }, 1000);
    //     })();
    //   },
    //   (error) => {
    //     if (error.PERMISSION_DENIED) {
    //       setHasGeolocationPermission(false);
    //     } else {
    //       console.error("GeolocationError: ", error);
    //     }
    //   }
    // );
  }, []);

  if (!hasGeolocationPermission)
    return <Flex>GIMMIE ACCESS TO YOUR LOCATION PLEASE</Flex>;

  const TextSegment: FC<PropsWithChildren<{ unit: string }>> = ({
    children,
    unit,
  }) => (
    <Flex w="100%">
      <Text w="55%" textAlign="end" mr="5px">
        {children}
      </Text>
      <Text w="45 %">{unit}</Text>
    </Flex>
  );

  return (
    <Flex flex={1} h="full" pos="relative" direction="column">
      <Flex
        w="full"
        flex={3}
        align="flex-end"
        justify="space-between"
        pos="relative"
        overflowY="hidden"
      >
        <WeatherBackground weatherData={weatherData} />
        <Loading isLoading={!weatherData} />

        {outfit ? (
          <>
            <Flex
              direction="column"
              flex={1}
              bgColor="white"
              p="10px"
              mb="10px"
              borderRadius="0px 10px 10px 0px"
            >
              <TextSegment unit="°C">
                {weatherData?.byHour[0].instant.airTemperature}
              </TextSegment>
              <TextSegment unit="m/s">
                {weatherData?.byHour[0].instant.windSpeed}
              </TextSegment>
            </Flex>
            <OutfitShowcase outfit={outfit} />
            <Flex
              flex={1}
              direction="column"
              bgColor="white"
              p="10px"
              mb="10px"
              borderRadius="10px 0px 0px 10px"
            >
              {(Object.keys(ClothingType) as (keyof typeof ClothingType)[]).map(
                (c) => {
                  if (!outfit[c]) return null;
                  return <Text key={c}>{CLOTHING_MAP[c].name}</Text>;
                }
              )}
            </Flex>
          </>
        ) : null}
      </Flex>
      <Flex transition="2s flex" flex={weatherData ? 1 : 0} zIndex={100} />
    </Flex>
  );
};

export default WeatherDisplay;
