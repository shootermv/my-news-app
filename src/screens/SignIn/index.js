import * as React from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { Alert } from "react-native";
import * as Facebook from "expo-facebook";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, Button, Center } from "native-base";

export default () => {
  const { setUserToken } = useContext(AuthContext);
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: process.env.FB_APP_KEY,
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
        setUserToken(token);
      } else {
        Alert.alert("Some error when trying to log in");
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <Center marginTop="12">
      <Button
        startIcon={
          <Icon as={MaterialCommunityIcons} name="facebook" size={5} />
        }
        onPress={() => logIn()}
      >
        log in with FB
      </Button>
    </Center>
  );
};
