export enum ClothingType {
  SWEATER,
  TOP,
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
