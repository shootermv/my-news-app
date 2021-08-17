import React, { useEffect, useState } from "react";
import {View, StyleSheet, Text } from "react-native";
import { Button, Icon } from "native-base"
import colors from "../constants/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
const Card = ({ item, onButtonPress, buttonText = "" }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Button
    startIcon={<Icon as={MaterialCommunityIcons} name="heart" size={5} color="red"/>}
      onPress={() => {
        onButtonPress(item);
      }}>{buttonText}</Button>
    
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Card;
