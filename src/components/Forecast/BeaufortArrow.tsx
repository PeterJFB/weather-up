import { Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { WeatherHourData } from "../../types/weather";

type Props = {
  windSpeed: WeatherHourData["instant"]["windSpeed"];
  fromDirection: WeatherHourData["instant"]["windFromDirection"];
};

const BeaufortArrow: FC<Props> = ({ windSpeed, fromDirection }) => {
  let arrowImage;

  const bounds = [
    0.2, 1.5, 3.3, 5.4, 7.9, 10.7, 13.8, 17.2, 20.7, 24.4, 28.4, 32.6,
  ];

  const beaufortImageIds = [
    null,
    "0000",
    "0025",
    "0050",
    "0075",
    "0100",
    "0125",
    "0150",
    "0175",
    "0225",
    "0250",
    "0300",
    "0350",
  ];

  bound: {
    for (let i = 0; i < bounds.length; i++) {
      if (windSpeed < bounds[i]) {
        arrowImage = beaufortImageIds[i];
        break bound;
      }
    }

    arrowImage = beaufortImageIds[beaufortImageIds.length - 1];
  }

  if (!arrowImage) return null;

  return (
    <Image
      w="22.5px"
      h="22.5px"
      _first={{ ml: "-11.25px" }}
      _last={{ mr: "-11.25px" }}
      src={`./beaufort/${arrowImage}.225.png`}
      transform={`rotate(${135 + fromDirection}deg)`}
    />
  );
};

export default BeaufortArrow;
