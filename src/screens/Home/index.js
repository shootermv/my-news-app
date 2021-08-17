import * as React from "react";
import {useContext} from "react";
import { View, Button, StyleSheet, StatusBar, FlatList } from "react-native";
import categories from "../../constants/categories";
import { AuthContext } from "../../utils/AuthContext";

export default ({ navigation }) => {
  const {userToken} = useContext(AuthContext);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Button
        title={item.title}
        onPress={() => {
          navigation.navigate("Posts", { category: item.id });
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
   
      <Button
        title="Go to Favorites"
        onPress={() => navigation.navigate(userToken ? "Favorites" : "SignIn")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
