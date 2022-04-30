import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { fetchWeater } from "../utils/weather";

const WeatherDisplay = () => {
  const [weatherContent, setWeatherContent] = useState<string>();
  const [hasGeolocationPermission, setHasGeolocationPermission] =
    useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        (async () => {
          const wc = JSON.stringify(await fetchWeater(latitude, longitude));
          setWeatherContent(wc);
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
  });

  if (!hasGeolocationPermission)
    return <Flex>GIMMIE ACCESS TO YOUR LOCATION PLEASE</Flex>;

  return <Flex>{weatherContent}</Flex>;
};

export default WeatherDisplay;
