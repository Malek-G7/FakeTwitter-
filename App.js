// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import SignUpScreen from "./Components/SignUpScreen";
import SignInScreen from "./Components/SignInScreen";
import HomeScreen from "./Components/HomeScreen";
import AllProducts from "./Components/PostsScreen";

const Stack = createNativeStackNavigator();
const LoginTab = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator();
const FYPStack = createNativeStackNavigator();

function LoginTabScreen() {
  return (
    <LoginTab.Navigator>
      <LoginTab.Screen name="SignIn" component={SignInScreen} />
      <LoginTab.Screen name="SignUp" component={SignUpScreen} />
    </LoginTab.Navigator>
  );
}

function FYPStackScreen() {
  return (
    <FYPStack.Navigator>
        <FYPStack.Screen name="Product" component={Product} />
        <FYPStack.Screen name="AllProducts" component={AllProducts} />
    </FYPStack.Navigator>
  );
}

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={LoginTabScreen}/>
        <Stack.Screen name="Posts" component={FYPStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//============================================================================================================================================================
const Product = ({ navigation, route }) => {
  const [newPrice, setNewPrice] = useState("");

  return (
    <ScrollView>
      <View style={styles.productDetails}>
        <Text style={styles.productText}>
          product name : {route.params.productName}
        </Text>
        <Text style={styles.productText}>
          product price : {route.params.productPrice}
        </Text>
      </View>
      <View style={styles.productTextInput}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type new product price here !"
          onChangeText={(Price) => {
            setNewPrice(Price);
          }}
        />
      </View>

      <Button
        title="update product price"
        onPress={async () => {
          console.log(newPrice);
          try {
            const res = await fetch(`${uri}/updatePrice`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
              },
              body: JSON.stringify({
                product: route.params.productName,
                price: newPrice,
              }), // Need to use POST to send body
            });
            const data = await res.json();
            navigation.navigate("Product", {
              productName: data.name,
              productPrice: data.price,
            });
          } catch (error) {}
        }}
      />
      <Button
        title="delete product"
        onPress={async () => {
          try {
            const res = await fetch(`${uri}/deleteProduct`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
              },
              body: JSON.stringify({ product: route.params.productName }), // Need to use POST to send body
            });
            navigation.navigate("Home");
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </ScrollView>
  );
};

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
