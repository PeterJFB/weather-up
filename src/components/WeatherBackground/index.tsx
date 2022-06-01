import React, {
  FC,
  TransitionEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@chakra-ui/react";
import { WeatherHourData } from "../../types/weather";
import CloudGroup from "./CloudGroup";
type Props = {
  hourData?: WeatherHourData;
};

type GradientProps = {
  hourData?: WeatherHourData;
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>;
};

const calculateGradient = (hourData: WeatherHourData) => {
  const lt = (
    (1 - Math.abs(hourData ? (hourData.time.getHours() - 12) / 12 : 1)) *
    100
  ).toPrecision(3);

  const st =
    (0.5 -
      Math.abs(
        0.5 -
          (1 - Math.abs(hourData ? (hourData.time.getHours() - 12) / 12 : 1))
      )) *
    70;

  const lb =
    (1 - Math.abs(hourData ? (hourData.time.getHours() - 12) / 12 : 1)) * 60;

  // console.log(hourData?.time.getHours(), st, lt);

  return `linear(hsl(205, ${st}%, ${lt}%), hsl(205, 81%, ${lb}%))`;
};

const LoadingGradient: FC<GradientProps> = ({ hourData }) => (
  <Box
    w="full"
    h="100%"
    pos="absolute"
    top={0}
    left={0}
    bgGradient="linear(blue.100, blue.400)"
    transition="1s opacity"
    opacity={hourData ? "0%" : "100%"}
    zIndex={-1}
  />
);

const TransitionGradient: FC<GradientProps> = ({
  hourData,
  onTransitionEnd,
}) => {
  const [prevHourData, setPrevHourData] = useState<WeatherHourData>();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!prevHourData) return setPrevHourData(hourData);

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 100);
  }, [hourData]);

  const gradient = prevHourData ? calculateGradient(prevHourData) : undefined;

  console.log(visible, !!hourData);

  return (
    <Box
      bgGradient={gradient}
      w="full"
      h="100%"
      pos="absolute"
      top={0}
      left={0}
      transition={!visible ? "1s opacity" : "none"}
      opacity={prevHourData && visible ? "100%" : "0%"}
      zIndex={-3}
      onTransitionEnd={() => {
        setPrevHourData(hourData);
      }}
    />
  );
};

const WeatherGradient: FC<GradientProps> = ({ hourData, onTransitionEnd }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setVisible(false);
    })();
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, [hourData]);

  // useEffect(() => {
  //   if (!visible)
  //     (async () => {
  //       setVisible(true);
  //     })();
  // }, [visible]);

  const gradient = hourData ? calculateGradient(hourData) : undefined;

  console.log(visible);

  return (
    <Box
      opacity={visible ? "100%" : "0%"}
      w="full"
      h="100%"
      pos="absolute"
      top={0}
      left={0}
      ref={ref}
      transition={visible ? "1s opacity" : "none"}
      bgGradient={gradient}
      // bgGradient="linear(green.700, blue.900)"
      // bgGradient="linear(blue.100, blue.400)"
      zIndex={-1}
      onTransitionEnd={onTransitionEnd}
    />
  );
};

const WeatherBackground: FC<Props> = ({ hourData }) => {
  return (
    <Box
      pos="absolute"
      top={0}
      left={0}
      w="full"
      h="100%"
      zIndex={-1}
      overflowX="hidden"
    >
      <LoadingGradient hourData={hourData} />
      <TransitionGradient hourData={hourData} />
      <WeatherGradient hourData={hourData} />
      {hourData ? (
        <CloudGroup cloudAreaFraction={hourData.instant.cloudAreaFraction} />
      ) : null}
      {/* <chakra.canvas /> */}
    </Box>
  );
};

export default WeatherBackground;
