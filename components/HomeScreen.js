// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card, Icon, Image } from "@rneui/themed";
import {
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import { cloneElement, useState, useEffect } from "react";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const uri = "http://54.209.183.235:5000";

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetch(
          `https://5189-193-1-57-1.ngrok-free.app/getAllPosts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <View style={styles.container}>
        <View style={styles.proPage}>
          <Text style={styles.Text}>View all posts</Text>
          <View>
            {allUsers.map((user, index) => (
              <Text key={index}>{user.email}</Text>
            ))}
          </View>
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
  proPage: {
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 150,
    alignItems: "center",
  },
});
