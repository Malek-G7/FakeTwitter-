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
  const uri = "http://54.209.183.235:5000";

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <View style={styles.container}>
        <View style={styles.add}>
          <Text style={styles.text}>Add a post!</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Give it a title!"
            onChangeText={(newName) => {
              setNewProduct({ ...newProduct, name: newName });
            }}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Start typing!"
            onChangeText={(newPrice) => {
              setNewProduct({ ...newProduct, price: newPrice });
            }}
          />
          <Pressable
            style={styles.button}
            onPress={async () => {
              let data;
              try {
                const res = await fetch(`${uri}/addProduct`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
                  },
                  body: JSON.stringify({
                    productName: newProduct.name,
                    productPrice: newProduct.price,
                  }), // Need to use POST to send body
                });
                data = await res.json();
              } catch (err) {
                console.log(err);
              }
              // navigation.navigate('product', {product : data })
            }}
          >
            <Text style={styles.Text}>Add post</Text>
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
    height: "100%",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    backgroundColor: "skyblue",
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    width: 200,
    borderWidth: 1,
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
  add: {
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
  }
});
