import React from "react";
import { Pressable, Icon, HStack } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { removeValueFromStore, getValuesFromStore } from "../../../utils/FavoritesStore";


const deleteRow = async (rowKey, toast, setListData) => {
  try {
    await removeValueFromStore(rowKey);
    const items = await getValuesFromStore();
    toast.show({
      title: "Removed from Favorites",
    });
    return await setListData(items.map((item) => ({ key: item.id, ...item })))
  } catch (error) {
    console.log("failed to remove item from Favorites", error);
    toast.show({
      title: "failed to remove item from Favorites",
      status: "error",
    });
    return;
  }
};

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

const HiddenItem = ({ data, rowMap, toast, setListData }) => {
  return (
    <HStack flex={1} pl={2}>
      <Pressable
        px={4}
        ml="auto"
        bg="dark.500"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Icon as={<Ionicons name="close" />} color="white" />
      </Pressable>
      <Pressable
        px={4}
        bg="red.500"
        justifyContent="center"
        onPress={() => {
          deleteRow(data.item.key, toast, setListData);
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Icon as={<MaterialIcons name="delete" />} color="white" />
      </Pressable>
    </HStack>
  );
};

export default HiddenItem;
