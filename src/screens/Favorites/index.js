import React, { useEffect, useState } from "react";

import { Alert } from "react-native";
import { getValuesFromStore, removeValueFromStore } from "../../utils/FavoritesStore";

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import Card from "../../components/Card";



const Favorites = () => {
  const getData = async () => {
    const items = await getValuesFromStore();
    setData(items);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);


  const renderItem = ({ item }) => (
    <Card
      item={item}
      onButtonPress={async () => {
        await removeValueFromStore(item.id);
        getData()
      }}
      buttonText="Remove from Favorites"
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        ListEmptyComponent={<Text style={styles.empty}>No Favorites Yet...</Text>}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  empty: { 
    textAlign: "center",
  }
});

export default Favorites;
