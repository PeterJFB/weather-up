import React, { FC } from "react";
import { Outfit } from "../../types/clothing";

type Props = {
  outfit: Outfit;
};

const OutfitShowcase: FC<Props> = ({ outfit }) => {
  return <>{JSON.stringify(outfit)}</>;
};

export default OutfitShowcase;
