import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getValuesFromStore } from "../../utils/FavoritesStore";

export const useFavoritesData = () => {
  const [list, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const items = await getValuesFromStore();
    setLoading(false);
    setListData(items.map((item) => ({ key: item.id, ...item })));
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  return {list, loading, setListData}
};
