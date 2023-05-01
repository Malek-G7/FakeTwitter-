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
  const [allPosts, setAllPosts] = useState([]);

  const uri = "https://075b-94-230-99-4.ngrok-free.app";

  const callAPIGetAll = async () => {
    try {
      const res = await fetch(`${uri}/getSpecificPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          username: text,
        }),
      });
      const data = await res.json();
      console.log(data);
      setAllPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

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
              onPress={() => console.log(async () => callAPIGetAll())}
              size={40}
              type="font-awesome5"
            />
          </View>
          <View>
            {allPosts.map((post, index) => (
              <Card key={index}>
                <Card.Title style={{ textAlign: "left" }}>
                  {post.username}
                </Card.Title>
                <Card.Divider />
                <Text style={{ marginBottom: 10 }}>{post.content}</Text>
                <View
                  style={{ flexDirection: "row", flexDirection: "row-reverse" }}
                >
                  <Icon
                    color="#0CC"
                    name="thumb-down-off-alt"
                    onPress={async () => callAPIUnlike(post._id)}
                    size={40}
                    type="material"
                  />
                  <Icon
                    color="#0CC"
                    name="thumb-up-off-alt"
                    onPress={async () => callAPILike(post._id)}
                    size={40}
                    type="material"
                  />
                  <Text style={{ margin: 10 }}>{post.likes}</Text>
                </View>
              </Card>
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
    flex: 0.5,
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
