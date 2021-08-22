import AsyncStorage from "@react-native-async-storage/async-storage";

import generateId from "./generateId";
const FAVORITES_KEY = "@my-favorite-news";

export const getValuesFromStore = async () => {
  try {
    const itemsFromStore = await AsyncStorage.getItem(FAVORITES_KEY);
    const items = itemsFromStore ? JSON.parse(itemsFromStore) : [];
    return items;
  } catch (error) {
    return null;
  }
};

export const removeValueFromStore = async (idToRemove) => {
  const itemsFromStore = await AsyncStorage.getItem(FAVORITES_KEY);
  const items = itemsFromStore ? JSON.parse(itemsFromStore) : [];
  if (!items.length) return; // nothing to remove from
  const filteredItems = items.filter(({ id }) => id !== idToRemove);
  return await AsyncStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(filteredItems)
  );
};

export const saveValueToStore = async (item) => {
  const itemsFromStore = await AsyncStorage.getItem(FAVORITES_KEY);
  const items = itemsFromStore ? JSON.parse(itemsFromStore) : [];
  // generate ID
  const newID = generateId(item);
  // prevent saving same article again
  if (items?.find(({ id }) => id === newID)) {
    throw Error("Data Exists");
  }

  const newItem = { ...item, id: newID };
  return await AsyncStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify([...items, newItem])
  );
};
