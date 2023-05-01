import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
const { S3Client } = require("@aws-sdk/client-s3")
const { PutObjectCommand ,GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
//import { v4 as uuidv4 } from 'uuid';


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
  const [image, setImage] = useState();

  const uri = "https://e18a-2a02-8084-a5bd-3200-59fe-6a5b-7f9-7534.ngrok-free.app";

  const bucketName = 'house-swiper'
  const bucketRegion = 'eu-west-1'
  const accessKey =  ''
  const secretAccessKey =  ''

  
  const s3 = new S3Client({
      credentials:{
          accessKeyId:accessKey,
          secretAccessKey: secretAccessKey
      },
      region: bucketRegion 
  })

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
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    const img = await fetchImageFromUri(pickerResult.assets[0].uri);
    setImage(img)
    setimageUri(pickerResult.assets[0].uri);
  };
 

 const fetchImageFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

function generateRandomImageName() {
  const randomNumber = Math.floor(Math.random() * 100000);
  return "image" + randomNumber.toString();
}

// Usage example: generate a random image name
const imageName = generateRandomImageName();
console.log(imageName);

  const callAPIAdd = async () => {
    try {
    //  const base64Image = await imageToBase64(imageuri)
    const imageName = generateRandomImageName()
    const res = await fetch(`${uri}/addPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
        },
        body: JSON.stringify({
          username: newPost.username,
          content: newPost.content,
          image : imageName
        }), // Need to use POST to send body
      });
      const data = await res.json();
      console.log(data);
      const params = {
        Bucket : bucketName,
        Key: imageName,
        Body : image,
        ContentType: 'image/jpeg'
      }
      const command = new PutObjectCommand(params)
      s3.send(command)
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
export default HomeScreen;

