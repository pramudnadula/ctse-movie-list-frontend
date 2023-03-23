import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  View,
  ScrollView,
  Button,
  Text,
} from "react-native";

const AddMovieAdmin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [review, setReview] = useState("");
  const [video, setVideo] = useState("");
  const [isSeries, setIsSeries] = useState(false);

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movie);
  };

  const pickImage = async () => {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: Expo.ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // react native
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.buttonContainer}>
              <Button title="Select Image" onPress={pickImage} />
            </View>
          </View>
          <Text style={styles.label}>Select the Template:</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Description"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Rating"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setRating(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Genre"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setGenre(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Year"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setYear(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Duration"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setDuration(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Review"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setReview(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Video"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setVideo(text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Is Series"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setIsSeries(text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Add Movie" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    margin: 20,
    width: "80%",
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#383838",
    padding: 10,
    borderRadius: 5,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: "#383838",
    padding: 10,
    borderRadius: 5,
    color: "#FFFFFF",
    height: 100,
    marginBottom: 15,
    textAlignVertical: "top",
  },

  imageContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    // width: 200,
    // height: 200,
    // borderRadius: 100,
  },
  buttonContainer: {
    // marginTop: 10,
  },
  inputContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default AddMovieAdmin;

// // Path: src\features\admin_movie\pages\editMovie.js
// import React, { useState } from "react";

// const EditMovie = () => {
