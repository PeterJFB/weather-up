import { Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { WeatherHourData } from "../../types/weather";

type Props = {
  windSpeed: WeatherHourData["instant"]["windSpeed"];
  fromDirection: WeatherHourData["instant"]["windFromDirection"];
};

const BaufortArrow: FC<Props> = ({ windSpeed, fromDirection }) => {
  let arrowImage = "0000";
  if (windSpeed < 0.2) {
    arrowImage = "0000";
  } else if (windSpeed < 1.5) {
    arrowImage = "0000";
  } else if (windSpeed < 3.3) {
    arrowImage = "0025";
  } else if (windSpeed < 5.4) {
    arrowImage = "0050";
  } else {
    arrowImage = "0075";
  }

  return (
    <Image
      w="22.5px"
      h="22.5px"
      _first={{ ml: "-11.25px" }}
      _last={{ mr: "-11.25px" }}
      src={`./baufort/${arrowImage}.225.png`}
      transform={`rotate(${135 + fromDirection}deg)`}
    />
  );
};

export default BaufortArrow;
