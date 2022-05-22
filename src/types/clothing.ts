export enum ClothingType {
  SWEATER = "SWEATER",
  TOP = "TOP",
}

export type Clothing = {
  name: string;
  type: ClothingType;
  minTemp?: number;
  maxTemp?: number;
  rainproof?: boolean;
  windproof?: boolean;
  clearWeather?: boolean;
};

export type Preferences = {
  clothingOptions: Record<string, Clothing>;
};

export type Outfit = {
  [key in ClothingType]: Clothing | undefined;
};
