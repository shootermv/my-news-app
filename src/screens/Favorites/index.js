import React, { useEffect, useState, useRef } from "react";
import { useColorMode } from "native-base";
import {
  getValuesFromStore,
  removeValueFromStore,
} from "../../utils/FavoritesStore";
import ColorCenter from "../../components/ColorableCenter";

import {
  Box,
  Text,
  Pressable,
  Icon,
  HStack,
  Avatar,
  Center,
  useToast,
  AlertDialog,
  Button,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenItem from "./components/HiddenItem";


const Favorites = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const getData = async () => {
    const items = await getValuesFromStore();
    setListData(items.map((item) => ({ key: item.id, ...item })));
  };
  const [listData, setListData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const renderHiddenItem = (data, rowMap) => {
    return <HiddenItem {...{ data, rowMap, toast, getData}} />;
  };
  const Item = ({ item, index }) => {
    const { colorMode } = useColorMode();
    return (
      <Box>
        <Pressable
          onPress={() => console.log("You touched me")}
          alignItems="center"
          bg={colorMode === "dark" ? "dark.200" : "white"}
          borderBottomColor="trueGray.200"
          borderBottomWidth={1}
          justifyContent="center"
          height={50}
          underlayColor={"#AAA"}
          _pressed={{
            bg: "trueGray.200",
          }}
          py={8}
        >
          <HStack width="100%" px={4}>
            <HStack space={2} alignItems="center">
              <Avatar color="white" bg={"secondary.700"}>
                <Text>{index}</Text>
              </Avatar>
              <Text>{item.title}</Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    );
  };
  const renderItem = ({ item, index }) => <Item {...{ item, index }} />;

  if (!listData.length)
    return (
      <ColorCenter>
        <Text>No favorites yet...</Text>
      </ColorCenter>
    );
  return (
    <Box  bg={colorMode === "dark" ? "black" : "white"} safeArea flex={1}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </Box>
  );
};

export default Favorites;
