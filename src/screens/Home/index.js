import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import categories from "../../constants/categories";
import { AuthContext } from "../../utils/AuthContext";

import { Button, FlatList, Heading } from "native-base";
import ColorCenter from "../../components/ColorableCenter";

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
    <ColorCenter>
      <Heading marginTop="4" data-testID="welcome">Categories</Heading>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Button onPress={() => navigation.navigate("Favorites")}>
        Go to Favorites
      </Button>
    </ColorCenter>
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
