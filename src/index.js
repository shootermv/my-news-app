import * as React from "react";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "./screens/Home";
import PostsScreen from "./screens/Posts";
import FavoritesScreen from "./screens/Favorites";
import SignInScreen from "./screens/SignIn";

const MainStack = createNativeStackNavigator();

import {
  Button,
  useColorMode,
} from "native-base";
// providers

import { AuthContext } from "./utils/AuthContext";
function Main() {
  const { toggleColorMode } = useColorMode();

  const { userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Button onPress={toggleColorMode} color="#fff">
                k
              </Button>
            ),
          }}
        />
        <MainStack.Screen name="Posts" component={PostsScreen}  options={{
            headerRight: () => (
              <Button onPress={toggleColorMode} color="#fff">
                k
              </Button>
            ),
          }}/>

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
