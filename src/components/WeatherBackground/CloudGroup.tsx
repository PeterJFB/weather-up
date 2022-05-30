import { Box, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React, { FC, TransitionEventHandler, useEffect, useState } from "react";
import { WeatherHourData } from "../../types/weather";

const hover = keyframes`
  from { transform: translateY(0px) translateX(-50%) scale(300%); }
  to { transform: translateY(12px) translateX(-50%) scale(300%); }
`;

const Cloud = ({
  onTransitionEnd,
  position,
}: {
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>;
  position: string[] | undefined;
}) => (
  <Image
    pos="absolute"
    left={position?.length ? position[0] : undefined}
    top={position?.length ? position[1] : undefined}
    src="./background/cloud.png"
    w="100px"
    h="100px"
    transition="0.5s opacity, 0.5s margin"
    transform="translateX(-50%) scale(300%)"
    opacity={position ? "100%" : "0%"}
    animation={position?.length ? `${hover} infinite 2s alternate` : undefined}
    filter="drop-shadow(0 3px 2px rgba(0, 0, 0, 0.4))"
    onTransitionEnd={onTransitionEnd}
  />
);

type Props = {
  cloudAreaFraction: WeatherHourData["instant"]["cloudAreaFraction"];
};

const CloudGroup: FC<Props> = ({ cloudAreaFraction }) => {
  const [clouds, setClouds] = useState<(string[] | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  if (cloudAreaFraction < 30) {
    return null;
  }

  const showCloud = (index: number) => () => {
    const c = [...clouds];
    c[index] = [`${Math.random() * 100}%`, `${Math.random() * 60 + 30}px`];
    setClouds(c);
  };

  useEffect(() => {
    showCloud(0)();
  }, []);

  return (
    <Box pos="relative">
      <Cloud position={clouds[0]} onTransitionEnd={showCloud(1)} />
      {cloudAreaFraction >= 60 && (
        <Cloud position={clouds[1]} onTransitionEnd={showCloud(2)} />
      )}
      {cloudAreaFraction >= 80 && <Cloud position={clouds[2]} />}
    </Box>
  );
};

export default CloudGroup;
