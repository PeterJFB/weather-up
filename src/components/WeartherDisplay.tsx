import React, { FC, useMemo } from "react";
import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { fetchWeater, normalizeWeatherData } from "../utils/weather";
import { RawWeatherResponse, WeatherData } from "../types/weather";
import { getSuitableOutfit } from "../core/WeatherUp";
import { ClothingType } from "../types/clothing";
import wData from "../utils/local/fixtures.json";

const WeatherDisplay: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(
    wData as WeatherData
  );
  const [hasGeolocationPermission, setHasGeolocationPermission] =
    useState(true);

  const outfit = useMemo(
    () => (weatherData ? getSuitableOutfit(weatherData.byHour[0]) : undefined),
    [weatherData]
  );

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       (async () => {
  //         const { error, data } = await fetchWeater(latitude, longitude);
  //         if (!error && data) {
  //           setWeatherData(data);
  //         }
  //       })();
  //     },
  //     (error) => {
  //       if (error.PERMISSION_DENIED) {
  //         setHasGeolocationPermission(false);
  //       } else {
  //         console.error("GeolocationError: ", error);
  //       }
  //     }
  //   );
  // }, []);

  if (!hasGeolocationPermission)
    return <Flex>GIMMIE ACCESS TO YOUR LOCATION PLEASE</Flex>;

  if (!outfit) {
    return <Flex>Loading Outfit ...</Flex>;
  }

  return (
    <Flex>
      <>
        {weatherData?.byHour[0].instant.airTemperature}
        {(Object.keys(ClothingType) as (keyof typeof ClothingType)[]).map(
          (c) => {
            if (!outfit[c]) return null;

            const clothing = outfit[c];
            return (
              <Text key={c}>
                {clothing?.name}, {clothing?.type}
              </Text>
            );
          }
        )}
      </>
    </Flex>
  );
};

export default WeatherDisplay;
