import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Button,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import Card from "../../components/Card";
import { Loading } from "../../components/Loading";
import { Toast } from "../../components/Toast";
import { saveValueToStore } from "../../utils/FavoritesStore";
import generateId from "../../utils/generateId";
// mock data
import data from "./data.json";
const DATA = data.data;

const renderItem = ({ item }) => (
  <Card
    item={item}
    onButtonPress={() => saveValueToStore(item)}
    buttonText="Save to Favorites"
  />
);

const Posts = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getData = async () => {
    // use mock data
    /*
    setLoading(true);
    setTimeout(() => {
      setError('ERror');
      setLoading(false);
    }, 1000);
    */    
    
    try {
     
      setLoading(true);
      const res = await fetch(
        `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&categories=${route.params.category}&languages=en`
      );
      if (!res.ok) { // throw error if status not OK
        throw Error(res?.errors || 'Some error');
      }

      const { data } = await res.json();
      setLoading(false);
      setData(data);
      
    } catch (_error) {
      console.log("error", _error);
      setLoading(false);
      setError("Some Error Happen");
    }
    
    
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Toast text="some error happen"/>;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) =>
          generateId(item)
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Posts;
