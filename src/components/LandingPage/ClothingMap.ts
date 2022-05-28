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
  SHORTS: {
    name: "Shorts",
    image: "./outfit/shorts.png",
  },
  JACKET: {
    name: "Jacket",
    image: "./outfit/jacket.png",
  },
  SHOES: {
    name: "Shoes",
    image: "./outfit/shoes.png",
  },
};
