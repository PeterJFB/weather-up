import React, { FC, useMemo } from "react";
import { useEffect, useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { fetchWeater } from "../../utils/weather";
import { WeatherData, WeatherHourData } from "../../types/weather";
import { getSuitableOutfit } from "../../core/WeatherUp";
import { ClothingType } from "../../types/clothing";
// import wData from "../../utils/local/fixture-raw.json";
import WeatherBackground from "../WeatherBackground";
import OutfitShowcase from "./OutfitShowcase";
import Loading from "../Loading";
import Forecast from "../Forecast";

const WeatherDisplay: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  // wData as WeatherData
  const [hasGeolocationPermission, setHasGeolocationPermission] =
    useState(true);

  const [hourData, setHourData] = useState<WeatherHourData>();

  const outfit = useMemo(
    () => (hourData ? getSuitableOutfit(hourData) : undefined),
    [hourData]
  );

  useEffect(() => {
    // setTimeout(() => {
    //   setWeatherData(
    //     normalizeWeatherData(wData, new Headers(), "40.333", "23.403")
    //   );
    // }, 1000);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        (async () => {
          const { error, data } = await fetchWeater(latitude, longitude);
          if (!error && data) {
            setWeatherData(data);
          }
        })();
      },
      (error) => {
        if (error.PERMISSION_DENIED) {
          setHasGeolocationPermission(false);
        } else {
          console.error("GeolocationError: ", error);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (weatherData) setHourData(weatherData.byHour[0]);
  }, [weatherData]);

  if (!hasGeolocationPermission)
    return <Flex>GIMMIE ACCESS TO YOUR LOCATION PLEASE</Flex>;

  return (
    <Flex flex={1} h="full" pos="relative" direction="column">
      <Flex
        w="full"
        flex={3}
        align="flex-end"
        justifyContent="center"
        justify="space-between"
        pos="relative"
        overflowY="hidden"
      >
        <WeatherBackground hourData={hourData} />
        <Loading isLoading={!weatherData} />

        {outfit ? (
          <Flex>
            <Flex
              direction="column"
              flex={1}
              bgColor="white"
              p="10px"
              ml="10px"
              minW="110px"
              alignSelf="flex-start"
              borderRadius="10px"
              backgroundBlendMode="multiply"
              align="center"
            >
              <Heading color="gray.400" size="m" textAlign="center">
                {hourData?.time.getHours()}:00
              </Heading>
              <Flex>
                <Text textAlign="right" mr="5px">
                  {hourData?.instant.airTemperature} <br />
                  {hourData?.instant.windSpeed} <br />
                  {hourData?.next1Hours?.percipitationAmount}
                </Text>
                <Text>
                  ??C <br />
                  m/s <br />
                  mm <br />
                </Text>
              </Flex>
            </Flex>
            <OutfitShowcase outfit={outfit} />
            <Flex
              flex={1}
              alignSelf="flex-start"
              direction="column"
              bgColor="white"
              minW="110px"
              p="10px"
              mr="10px"
              borderRadius="10px"
            >
              <Heading color="gray.400" size="m" textAlign="center">
                Clothing:
              </Heading>
              {Object.values(outfit).some((v) => v !== undefined)
                ? (
                    Object.keys(ClothingType) as (keyof typeof ClothingType)[]
                  ).map((c) => {
                    if (!outfit[c]) return null;
                    return <Text key={c}>{outfit[c]?.name}</Text>;
                  })
                : "Ummm none"}
            </Flex>
          </Flex>
        ) : null}
      </Flex>
      <Flex
        transition="2s flex"
        maxH="100%"
        maxW="100%"
        flex={weatherData ? 1 : 0}
        zIndex={10}
        overflowY="hidden"
        justify="center"
        align="center"
      >
        {weatherData && (
          <Forecast
            weatherData={weatherData}
            setHourData={setHourData}
            hourTime={hourData?.time.getTime()}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default WeatherDisplay;
