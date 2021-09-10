import React, { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

import { Spinner, useColorMode } from "native-base";
import { getValuesFromStore } from "../../utils/FavoritesStore";
import ColorCenter from "../../components/ColorableCenter";

import { Box, Text, useToast } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";

import HiddenItem from "./components/HiddenItem";
import Item from "./components/Item";
import { useFavoritesData } from "./useFavoritesData";

const Favorites = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const {list: listData, loading, setListData} = useFavoritesData()
  /*
  const getData = async () => {
    const items = await getValuesFromStore();
    setListData(items.map((item) => ({ key: item.id, ...item })));
  };
  
  const [listData, setListData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  );
  */

  const renderHiddenItem = (data, rowMap) => (
    <HiddenItem {...{ data, rowMap, toast, setListData }} />
  );

  const renderItem = ({ item, index }) => <Item {...{ item, index }} />;

  if (loading) return <ColorCenter><Spinner accessibilityLabel="Loading favories" /></ColorCenter>;
  
  if (!listData.length)
    return (
      <ColorCenter>
        <Text>No favorites yet...</Text>
      </ColorCenter>
    );
  return (
    <Box bg={colorMode === "dark" ? "black" : "white"} safeArea flex={1}>
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
