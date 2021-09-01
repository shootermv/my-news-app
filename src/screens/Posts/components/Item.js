import React from "react";
import { useToast } from "native-base";

import Card from "../../../components/Card";
import { saveValueToStore } from "../../../utils/FavoritesStore";

const Item = ({ item }) => {
  const toast = useToast();
  return (
    <Card
      item={item}
      onButtonPress={async () => {
        try {

          await saveValueToStore(item);
          toast.show({
            title: "Saved At Favorites",
          });
        } catch (er) {
          console.log('error:', er)
          toast.show({
            title: "Already Exsist",
            status: "error",
          });
        }
      }}
      buttonText="Save to Favorites"
    />
  );
};

export default Item;
