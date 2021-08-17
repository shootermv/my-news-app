import * as React from "react";
import {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "./screens/Home";
import PostsScreen from "./screens/Posts";
import FavoritesScreen from "./screens/Favorites";
import SignInScreen from "./screens/SignIn";


// providers
const MainStack = createNativeStackNavigator();

import { AuthContext } from "./utils/AuthContext";

function Main() {
  const { userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Posts" component={PostsScreen} />

        {userToken == null ? (
          <MainStack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <MainStack.Screen name="Favorites" component={FavoritesScreen} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
