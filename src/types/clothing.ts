export enum ClothingType {
  SWEATER,
  TOP,
}

export type Clothing = {
  name: string;
  type: ClothingType;
  minTemp?: number;
  maxTemp?: number;
  rainProof?: boolean;
  windProof?: boolean;
};

export type Preferences = {
  clothing: Clothing[];
};
