import { Box, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React, { TransitionEventHandler, useEffect, useState } from "react";

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

const CloudGroup = () => {
  const [clouds, setClouds] = useState<(string[] | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const showCloud = (index: number) => () => {
    const c = [...clouds];
    c[index] = [`${Math.random() * 100}%`, `${Math.random() * 60 + 30}px`];
    console.log(c);
    setClouds(c);
  };

  useEffect(() => {
    showCloud(0)();
  }, []);

  return (
    <Box pos="relative">
      <>{console.log(clouds)}</>
      <Cloud position={clouds[0]} onTransitionEnd={showCloud(1)} />
      <Cloud position={clouds[1]} onTransitionEnd={showCloud(2)} />
      <Cloud position={clouds[2]} />
    </Box>
  );
};

export default CloudGroup;
