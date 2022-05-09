import { Clothing, Preferences } from "../types/clothing";

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
  prevClothing: Clothing,
  newClothing: Clothing
): Preferences["clothingOptions"] | null => {
  const preferences = getPreferences();

  // Prevent override of existing clothing
  if (prevClothing.name !== newClothing.name) {
    if (Object.keys(preferences.clothingOptions).includes(newClothing.name)) {
      return null;
    }
  }

  preferences.clothingOptions[newClothing.name] = newClothing;

  savePreferences(preferences);

  return preferences.clothingOptions;
};
