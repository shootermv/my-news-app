import React from "react";
import {
  Box,
  Text,
  Pressable,
  HStack,
  Avatar,
  useColorMode,
} from "native-base";

const Item = ({ item, index }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
        alignItems="center"
        bg={colorMode === "dark" ? "dark.200" : "white"}
        borderBottomColor="trueGray.200"
        borderBottomWidth={1}
        justifyContent="center"
        height={50}
        underlayColor={"#AAA"}
        _pressed={{
          bg: "trueGray.200",
        }}
        py={8}
      >
        <HStack width="100%" px={4}>
          <HStack space={2} alignItems="center">
            <Avatar color="white" bg={"secondary.700"}>
              <Text>{index}</Text>
            </Avatar>
            <Text>{item.title}</Text>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );
};

export default Item;
