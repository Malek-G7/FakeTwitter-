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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const uri = "http://54.209.183.235:5000";

  const callAPIUpdate = async () => {
    try {
      //find user in db
      //set isSignedIn to true
      navigation.navigate("Waves", { screen: "HomeScreen", initial: false });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Wave</Text>
        <View style={styles.search}>
          <Text style={styles.text}>Sign In</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="password"
            onChangeText={(password) => setPassword(password)}
          />
          <Pressable style={styles.button} onPress={async () => callAPIUpdate()} >
            <Text style={styles.Text}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
