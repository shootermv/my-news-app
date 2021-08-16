import React from 'react';
import { View, Text} from 'react-native';
import colors from '../constants/colors';

export const Toast = ({type = "danger", text}) => (
  <View style={{ paddingVertical: 20 ,margin: 20 , backgroundColor: type === 'danger' ? colors.brand : colors.secondary}}>
    <Text style={{color: type === 'danger' ? colors.white : colors.primary, textAlign: "center"}}>{text}</Text>
  </View>
);