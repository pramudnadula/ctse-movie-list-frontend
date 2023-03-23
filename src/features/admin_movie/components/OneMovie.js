import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Button } from "react-native";

const OneMovie = ({ post }) => {
  const genres = [
    { name: "Action", color: "#FF5733" },
    { name: "Comedy", color: "#FFC300" },
    { name: "Drama", color: "#C70039" },
    { name: "Horror", color: "#610B21" },
    { name: "Science Fiction", color: "#138D75" },
    { name: "Romance", color: "#ff1100" },
    { name: "Thriller", color: "#8E44AD" },
    { name: "Animation", color: "#2ECC71" },
    { name: "Adventure", color: "#F1C40F" },
    { name: "Fantasy", color: "#3498DB" },
    { name: "Crime", color: "#273746" },
    { name: "Documentary", color: "#6C3483" },
    { name: "Musical", color: "#F1948A" },
    { name: "Mystery", color: "#1B2631" },
    { name: "War", color: "#BDC3C7" },
    { name: "Western", color: "#A04000" },
  ];

  const [wishList, setWishList] = useState(false);

  const handleWishList = (id, wishList) => {
    setWishList(wishList);
    console.log(id);
    if (wishList) {
      ToastAndroid.show("Added To WishList", ToastAndroid.SHORT);
    }
    if (!wishList) {
      ToastAndroid.show("Removed From WishList", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.image}
          source={{
            uri: post?.image1
              ? post?.image1
              : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
          }}
        />
      </View>

      <View style={styles.rightContainer}>
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          {post?.title ? post?.title : "No Title"}
        </Text>
        <Text
          style={{
            color: "white",
            backgroundColor: genres.find((genre) => genre.name === post?.genre)
              ?.color,
            padding: 5,
            width: 100,
            borderRadius: 5,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {post?.genre}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            height: 24,
            width: "100%",
          }}
        >
          {post?.description ? post?.description : "No Description"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12,
          }}
        >
          {post?.year
            ? `Release Date: ${post?.year}`
            : "No Release Date : Still in Production"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12,
          }}
        >
          {post?.rate
            ? (post?.rate == 1 && "⭐") ||
              (post?.rate == 2 && "⭐⭐") ||
              (post?.rate == 3 && "⭐⭐⭐") ||
              (post?.rate == 4 && "⭐⭐⭐⭐") ||
              (post?.rate == 5 && "⭐⭐⭐⭐⭐")
            : "No Rating"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12,
          }}
        >
          {post?.duration
            ? Math.floor(post?.duration / 60) +
              "h " +
              (post?.duration % 60) +
              "m"
            : "No Duration"}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: wishList ? "red" : "black",
            width: 35,
            height: 45,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          onPress={() => handleWishList(post?.id, !wishList)}
        >
          <Ionicons
            style={{
              color: "white",
            }}
            name="heart"
            size={32}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  leftContainer: {
    flex: 4,
  },
  rightContainer: {
    flex: 7,
    gap: 10,
    paddingLeft: 10,
  },
  image: {
    borderRadius: 5,
    width: "100%",
    height: 200,
  },
});

export default OneMovie;
