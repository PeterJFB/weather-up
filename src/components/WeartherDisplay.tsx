import React from "react";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { fetchWeater } from "../utils/weather";

const WeatherDisplay = () => {
  const [weatherContent, setWeatherContent] = useState<string>();

  useEffect(() => {
    (async () => {
      const wc = JSON.stringify(await fetchWeater());
      setWeatherContent(wc);
    })();
  });
  return <Flex>{weatherContent}</Flex>;
};

export default WeatherDisplay;
