import React, { FC } from "react";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { fetchWeater } from "../utils/weather";
import { WeatherData } from "../types/weather";

const WeatherDisplay: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [hasGeolocationPermission, setHasGeolocationPermission] =
    useState(true);

  useEffect(() => {
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

  if (!hasGeolocationPermission)
    return <Flex>GIMMIE ACCESS TO YOUR LOCATION PLEASE</Flex>;

  return (
    <Flex>
      <>
        {weatherData?.byHour[0].instant.airTemperature}
        {console.log(weatherData?.byHour)}
      </>
    </Flex>
  );
};

export default WeatherDisplay;
