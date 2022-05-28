import { Fade, Image } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  isLoading: boolean;
};

const Loading: FC<Props> = ({ isLoading }) => (
  <Fade unmountOnExit in={isLoading}>
    <Image
      src="./globe.gif"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translateX(-50%) translateY(-50%)"
      objectFit="contain"
      w="100px"
      h="100px"
    />
  </Fade>
);

export default Loading;
