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
import * as React from "react";
import { Icon } from "@rneui/base";

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
        <View style={styles.search}>
          <View style={styles.row}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(newText) => setText(newText)}
            />
            <Icon
              color="#0CC"
              name="search"
              onPress={() => console.log("onPress()")}
              size={40}
              type="font-awesome5"
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={async () => {
              let data;
              try {
                const res = await fetch(`${uri}/getSpecificProduct`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
                  },
                  body: JSON.stringify({ productName: text }), // Need to use POST to send body
                });
                data = await res.json();
                navigation.navigate("Product", {
                  productName: data.name,
                  productPrice: data.price,
                });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Text style={styles.Text}>Search</Text>
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
  search: {
    flex: .5,
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});
