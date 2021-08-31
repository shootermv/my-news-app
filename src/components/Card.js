import React from "react";
import {View, StyleSheet} from "react-native";
import { Button, Icon, Text, useColorMode, Box} from "native-base"
import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Card = ({ item, onButtonPress, buttonText = "" }) =>{
  const { colorMode } = useColorMode();
  return (
  
  <Box style={styles.item} bg={colorMode === 'dark' ? 'dark.100' : 'light.100'}>
    <Text style={styles.title}>{item.title}</Text>
    <Button
    startIcon={<Icon as={MaterialCommunityIcons} name="heart" size={5} color="red"/>}
      onPress={() => {
        onButtonPress(item);
      }}>{buttonText}</Button>
    
  </Box>
);
    }

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Card;
