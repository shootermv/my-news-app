import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./src/utils/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

// screens
import HomeScreen from "./src/screens/Home";
import PostsScreen from "./src/screens/Posts";
import FavoritesScreen from "./src/screens/Favorites";
import SignInScreen from "./src/screens/SignIn";

const MainStack = createNativeStackNavigator();

function App() {
  const [userToken, setUserToken] = useState(null);
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
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
    </AuthContext.Provider>
  );
}

export default App;
