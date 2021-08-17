import React, { useEffect, useState } from "react";
import {View, StyleSheet, Text } from "react-native";
import { Button, Center, NativeBaseProvider } from "native-base"
import colors from "../constants/colors";

const Card = ({ item, onButtonPress, buttonText = "" }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Button
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
