export enum ClothingType {
  SHORTS = "SHORTS",
  SHOES = "SHOES",
  T_SHIRT = "T_SHIRT",
  SWEATER = "SWEATER",
  JACKET = "JACKET",
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
