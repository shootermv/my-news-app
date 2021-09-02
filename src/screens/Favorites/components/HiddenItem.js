import React from "react";
import { Pressable, Icon, HStack } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { removeValueFromStore } from "../../../utils/FavoritesStore";


const deleteRow = async (rowKey, toast, getData) => {
  try {
    await removeValueFromStore(rowKey);
    toast.show({
      title: "Removed from Favorites",
    });
    getData();
  } catch (error) {
    console.log("failed to remove item from Favorites", error);
    toast.show({
      title: "failed to remove item from Favorites",
      status: "error",
    });
  }
};

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

const HiddenItem = ({ data, rowMap, toast, getData }) => {
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
          deleteRow(data.item.key, toast, getData);
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
