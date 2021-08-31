import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Heading, Center, useToast, Spinner, FlatList } from "native-base";

import Card from "../../components/Card";

import { Toast } from "../../components/Toast";
import { saveValueToStore } from "../../utils/FavoritesStore";
import { usePostsData } from "../../utils/api";
import ColorCenter from "../../components/ColorableCenter";

const renderItem = ({ item, toast }) => {
  return (
    <Card
      item={item}
      onButtonPress={async () => {
        try{
          await saveValueToStore(item);
          toast.show({
            title: "Saved At Favorites",
          });
        } catch(er) {
          toast.show({
            title: "Already Exsist",
            status: "error",
          });
        }
      }}
      buttonText="Save to Favorites"
    />
  );
};

const Posts = ({ route }) => {
  const { data, error, isFetching } = usePostsData(route.params.category);
  const toast = useToast();
  if (isFetching) return   <Spinner accessibilityLabel="Loading posts" />;
  if (error) return <Toast text="some error happen" />;
  return (
    <ColorCenter>
      
      <Heading>{`Posts of "${route.params.category}" category`}</Heading>
     
      <FlatList
        data={data}
        renderItem={({item}) => renderItem({item, toast})}
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
