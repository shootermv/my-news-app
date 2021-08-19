import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Button,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";


import Card from "../../components/Card";
import { Loading } from "../../components/Loading";
import { Toast } from "../../components/Toast";
import { saveValueToStore } from "../../utils/FavoritesStore";
import generateId from "../../utils/generateId";
import { usePostsData } from "./usePosts";

const renderItem = ({ item }) => (
  <Card
    item={item}
    onButtonPress={() => saveValueToStore(item)}
    buttonText="Save to Favorites"
  />
);

const Posts = ({ route }) => {
  const { data, error, isFetching } = usePostsData(route.params.category);

  if (isFetching) return <Loading />;
  if (error) return <Toast text="some error happen" />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => generateId(item)}
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
});

export default Posts;
