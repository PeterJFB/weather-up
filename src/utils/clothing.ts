import { ClothingFormValues } from "../components/ClothingEditor/ClothingForm";
import { Clothing, Preferences } from "../types/clothing";

// Constants

export const CLOTHING_MIN_TEMP = -40;
export const CLOTHING_MAX_TEMP = 60;

// Form

export const extractClothingFromForm = (
  values: ClothingFormValues
): Clothing => {
  return {
    ...(values as Clothing), // We're enforcing existance of fields in validation
    ...(values.tempRange
      ? { minTemp: values.tempRange[0], maxTemp: values.tempRange[1] }
      : null),
  };
};

// Storage
const LS_PREFERENCES = "wu-preferences";

const generatePreferences = () => {
  const initalPreferences: Preferences = { clothingOptions: {} };
  localStorage.setItem(LS_PREFERENCES, JSON.stringify(initalPreferences));
  return initalPreferences;
};

const savePreferences = (preferences: Preferences) => {
  localStorage.setItem(LS_PREFERENCES, JSON.stringify(preferences));
};

export const getPreferences = (): Preferences => {
  const preferences = localStorage.getItem(LS_PREFERENCES);

  if (!preferences) {
    return generatePreferences();
  }

  return JSON.parse(preferences);
};

export const updateClothing = (
  newClothing: Clothing,
  prevClothing?: Clothing
): Preferences["clothingOptions"] | null => {
  const preferences = getPreferences();

  // Prevent override of existing clothing
  if (prevClothing?.name !== newClothing.name) {
    if (Object.keys(preferences.clothingOptions).includes(newClothing.name)) {
      return null;
    }
  }

  preferences.clothingOptions[newClothing.name] = newClothing;

  savePreferences(preferences);

  return preferences.clothingOptions;
};
