import { Clothing, ClothingType, Outfit } from "../types/clothing";
import { WeatherHourData } from "../types/weather";
import { getPreferences } from "../utils/clothing";

export const getSuitableOutfit = (hourData: WeatherHourData) => {
  const outfit: Outfit = {
    SWEATER: undefined,
    TOP: undefined,
  };

  const { clothingOptions } = getPreferences();

  for (const c in clothingOptions) {
    const clothing = clothingOptions[c];

    const temp = hourData.instant.airTemperature;
    if (
      (!clothing.minTemp || clothing.minTemp <= temp) &&
      (!clothing.maxTemp || temp <= clothing?.maxTemp)
    )
      outfit[clothing.type] = clothing;
  }
  return outfit;
};
