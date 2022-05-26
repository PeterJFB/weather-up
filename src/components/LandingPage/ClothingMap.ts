import { ClothingType } from "../../types/clothing";

export const CLOTHING_MAP: {
  [key in ClothingType]: { name: string; image: string };
} = {
  SWEATER: {
    name: "Sweater",
    image: "./outfit/sweater.png",
  },
  T_SHIRT: {
    name: "T-shirt",
    image: "./outfit/t-shirt.png",
  },
};
