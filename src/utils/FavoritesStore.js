import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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

export const removeValueFromStore = async (idToRemove, cb) => {
  try {
    const itemsFromStore = await AsyncStorage.getItem(FAVORITES_KEY);
    const items = itemsFromStore ? JSON.parse(itemsFromStore) : [];
    if (!items.length) return; // nothing to remove from
    const filteredItems = items.filter(({ id }) => id !== idToRemove);
    await AsyncStorage.setItem(
        FAVORITES_KEY,
      JSON.stringify(filteredItems)
    );
    Alert.alert("Item Removed");
    cb();
  } catch (error) {
    console.log(error);
    Alert.alert("Error When Trying To Remove Item");
  }
};

export const saveValueToStore = async (item) => {
    try {
     const itemsFromStore = await AsyncStorage.getItem(FAVORITES_KEY);
     const items = itemsFromStore ? JSON.parse(itemsFromStore) : [];
     // generate ID
     const newID = item.title.replace(/\s/g, "-");
     // prevent saving sane article again
     if (items?.find(({id}) => id === newID)) {
         Alert.alert('Data Exists');
         return;
     }
     
     const newItem = {...item, id: newID};
     await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...items, newItem]));
    
     Alert.alert('Data Saved');
   } catch(error) {
     Alert.alert(error || 'Data Not Saved');
   }
 };