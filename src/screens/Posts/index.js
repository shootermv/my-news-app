import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Heading, Spinner, FlatList } from "native-base";

import Item from "./components/Item";

import { Toast } from "../../components/Toast";
import { usePostsData } from "../../utils/api";
import ColorCenter from "../../components/ColorableCenter";

const Posts = ({ route }) => {
  const { data, error, isFetching } = usePostsData(route.params.category);

  if (isFetching) return <Spinner accessibilityLabel="Loading posts" />;
  if (error) return <Toast text="some error happen" />;
  return (
    <ColorCenter>
      <Heading>{`Posts of "${route.params.category}" category`}</Heading>

      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </ColorCenter>
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
