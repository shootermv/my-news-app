import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import categories from "../../constants/categories";
import { AuthContext } from "../../utils/AuthContext";

import { Center, Button, FlatList } from "native-base";

export default ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Button
        onPress={() => {
          navigation.navigate("Posts", { category: item.id });
        }}
      >
        {item.title}
      </Button>
    </View>
  );

  return (
    <Center flex={1}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Button
        onPress={() => navigation.navigate(userToken ? "Favorites" : "SignIn")}
      >
        Go to Favorites
      </Button>
    </Center>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
