// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import RNFS from 'react-native-fs';

import {
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
  Text,
  Image,
  View,
  TextInput,
} from "react-native";
import { cloneElement, useState } from "react";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [newPost, setNewPost] = useState({
    username: "",
    content: "",
    likes: "",
  });
  const [imageuri, setimageUri] = useState();

  const uri = "https://e77f-193-1-57-1.ngrok-free.app";

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    let succss = false;
    if (result.status == "granted") succss = true;
    if (result.permissions)
      if (result.permissions.camera.status == "granted") succss = true;
    console.log("result: " + JSON.stringify(result));
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setimageUri(image.assets[0].uri);
  };

const imageToBase64 = async (imagePath) => {
  try {
    const base64String = await RNFS.readFile(imagePath, 'base64');
    return base64String;
  } catch (error) {
    console.log(error);
  }
};
  
  const callAPIAdd = async () => {
    try {
      const base64Image = await imageToBase64(imageuri)

      const res = await fetch(`${uri}/addPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
        },
        body: JSON.stringify({
          username: newPost.username,
          content: newPost.content,
          image : base64Image
          
        }), // Need to use POST to send body
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <View style={styles.container}>
        <View style={styles.add}>
          <Text style={styles.text}>Add a post!</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Username!"
            onChangeText={(newUsername) => {
              setNewPost({ ...newPost, username: newUsername });
            }}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Content!"
            onChangeText={(newContent) => {
              setNewPost({ ...newPost, content: newContent });
            }}
          />
          <Text>pick an image</Text>
          <Button
            style={styles.imagePicker}
            title="Take Image"
            color={"#444"}
            onPress={takeImageHandler}
          />
          <View style={styles.imagePreview}>
            {!imageuri ? (
              <Text>No image picked yet.</Text>
            ) : (
              <Image style={styles.image} source={{ uri: imageuri }} />
            )}
          </View>
          <Button
            color="#333"
            title="Post"
            onPress={async () => callAPIAdd()}
          />
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
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
