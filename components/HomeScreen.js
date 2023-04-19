// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import { cloneElement, useState } from "react";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <View style={styles.container}>
        <View style={styles.proPage}>
          <Text style={styles.text}>Browse posts</Text>
          <Pressable
            style={styles.button}
            onPress={async () => {
              try {
                const res = await fetch(`${uri}/getAllProducts`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
                  },
                });
                const data = await res.json();
                console.log(data);
                navigation.navigate("AllProducts", { products: data });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Text style={styles.Text}>View all</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderWidth: 10,
    padding: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    backgroundColor: "skyblue",
    marginTop: 30,
    height: 40,
    width: 200,
    borderWidth: 4,
    justifyContent: "center",
  },
  TextInput: {
    borderWidth: 1,
    textAlign: "center",
    height: 30,
    width: 200,
    marginTop: 30,
    marginBottom: 20,
  },
  Text: {
    textAlign: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,

    textAlign: "center",
  },

  search: {
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 50,
    alignItems: "center",
  },

  add: {
    backgroundColor: "white",
    marginTop: 100,

    alignItems: "center",
  },

  proPage: {
    marginTop: 100,
    marginBottom: 150,
    alignItems: "center",
  },
  productDetails: {
    alignItems: "center",
    marginBottom: 100,
  },
  productText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  productTextInput: {
    alignItems: "center",
  },
});
