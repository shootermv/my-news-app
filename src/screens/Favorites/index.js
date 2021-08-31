import React, { useEffect, useState, useRef } from "react";

import {
  getValuesFromStore,
  removeValueFromStore,
} from "../../utils/FavoritesStore";
import ColorCenter from "../../components/ColorableCenter";
import {
  Box,
  Text,
  Pressable,
  Icon,
  HStack,
  Avatar,
  Center,  
  useToast, 
  AlertDialog,
  Button
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";


const Favorites = () => {
  const toast = useToast();
  const getData = async () => {
    const items = await getValuesFromStore();
    setListData(items.map(item => ({key: item.id, ...item})));
  };
  const [listData, setListData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (_, rowKey, onClose) => {
    try {
      await removeValueFromStore(rowKey);
      
      toast.show({
        title: "Removed from Favorites",
      });
      onClose()
      getData();
    } catch (error) {
      console.log("failed to remove item from Favorites", error)
      toast.show({
        title: "failed to remove item from Favorites",
        status: "error",
      });
    }
  };

  const renderHiddenItem = (data, rowMap) => {
    return (

      <HStack flex={1} pl={2}>
        <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={"fade"}
      >
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            Delete Item
          </AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure? You can't undo this action afterwards.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onPress={() => deleteRow(rowMap, data.item.id, onClose)} ml={3}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
        <Pressable
          px={4}
          ml="auto"
          bg="dark.500"
          justifyContent="center"
          onPress={() => closeRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Icon as={<Ionicons name="close" />} color="white" />
        </Pressable>
        <Pressable
          px={4}
          bg="red.500"
          justifyContent="center"
          onPress={() => {
            //
            setIsOpen(true) 
            //deleteRow(rowMap, data.item.id);
          }}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Icon as={<MaterialIcons name="delete" />} color="white" />
        </Pressable>
      </HStack>
    );
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
        alignItems="center"
        bg="white"
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

  if (!listData.length) return <Center><Text>No favorites yet...</Text></Center>
  return (
    <ColorCenter>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </ColorCenter>
  );
 
};


export default Favorites;
