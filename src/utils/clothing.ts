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
  const initalPreferences: Preferences = { clothingOptions: [] };
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

  if (prevClothing) {
    if (prevClothing.name !== newClothing.name) {
      for (const clothing of preferences.clothingOptions)
        if (clothing.name === newClothing.name) return null;
    }
    for (let i = 0; i < preferences.clothingOptions.length; i++) {
      if (preferences.clothingOptions[i].name === prevClothing.name) {
        preferences.clothingOptions[i] = newClothing;
        savePreferences(preferences);
        return preferences.clothingOptions;
      }
    }
  }

  for (const clothing of preferences.clothingOptions)
    if (clothing.name === newClothing.name) return null;

  preferences.clothingOptions.unshift(newClothing);

  savePreferences(preferences);

  return preferences.clothingOptions;
};

export const moveClothingPriority = (i: number, direction: "UP" | "DOWN") => {
  const preferences = getPreferences();

  if (direction === "UP") {
    if (i === 0) return;

    preferences.clothingOptions.splice(
      i - 1,
      2,
      preferences.clothingOptions[i],
      preferences.clothingOptions[i - 1]
    );
  }

  if (direction === "DOWN") {
    if (i === preferences.clothingOptions.length - 1) return;

    preferences.clothingOptions.splice(
      i,
      2,
      preferences.clothingOptions[i + 1],
      preferences.clothingOptions[i]
    );
  }
  savePreferences(preferences);
};

export const deleteClothing = (clothing: Clothing) => {
  const preferences = getPreferences();

  for (let i = 0; i < preferences.clothingOptions.length; i++) {
    if (preferences.clothingOptions[i].name === clothing.name) {
      const deleted = preferences.clothingOptions.splice(i, 1);
      savePreferences(preferences);
      return deleted;
    }
  }
  return null;
};
