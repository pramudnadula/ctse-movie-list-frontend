import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Drawer from "react-native-drawer";

import Home from "./src/common/Home";
import AddMovie from "./src/features/userMovie/pages/AddMovie";
import AllMovies from "./src/features/userMovie/pages/AllMovies";
import Login from "./src/common/Login";
import ReviewList from "./src/features/movie_review/pages/ReviewList";
import Sidebar from "./src/common/Sidebar";
import ReviewAdd from "./src/features/movie_review/pages/ReviewAdd";
import Review from "./src/features/movie_review/pages/Review";

import * as firebase from "firebase/app";
import "firebase/storage";
import * as Expo from "expo";
import AddMovieAdmin from "./src/features/admin_movie/pages/AddMovieAdmin";
import ViewAllMoviesAdmin from "./src/features/admin_movie/pages/ViewAllMoviesAdmin";

const firebaseConfig = {
  apiKey: "AIzaSyAP3EmZSGQq7iZieAoXlHUcYw1LsTkWbTA",
  authDomain: "firbase-sample-85e8e.firebaseapp.com",
  databaseURL: "https://firbase-sample-85e8e-default-rtdb.firebaseio.com",
  projectId: "firbase-sample-85e8e",
  storageBucket: "firbase-sample-85e8e.appspot.com",
  messagingSenderId: "744381209571",
  appId: "1:744381209571:web:6ec94e38f589480ac09ed6",
  measurementId: "G-CNBC8K39KC",
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Test the Firebase storage

  const drawerStyles = {
    drawer: {
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 3,
      backgroundColor: "#222",
      panOpenMask: 0.1, // allow sidebar to open when swiping from left screen
    },
    main: { paddingLeft: 3 },
  };
  const toggleDrawer = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <NavigationContainer>
      <Drawer
        content={<Sidebar toggleDrawer={toggleDrawer} />}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        panThreshold={0.5}
      >
        <Tab.Navigator
          screenOptions={({ navigation, route }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => toggleDrawer()}>
                <View style={{ marginLeft: 10 }}>
                  <Ionicons name="menu-outline" size={24} color="black" />
                </View>
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Login") {
                iconName = focused ? "home" : "home";
                return <AntDesign name={iconName} size={size} color={color} />;
              } else if (route.name === "Review") {
                iconName = focused ? "profile" : "profile";
                return <AntDesign name={iconName} size={size} color={color} />;
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            style: {
              backgroundColor: "black",
              borderTopWidth: 0,
              shadowOffset: { width: 5, height: 3 },
              shadowColor: "black",
              shadowOpacity: 0.5,
              elevation: 5,
              paddingTop: 5,
            },
          }}
        >
          <Tab.Screen
            name="Review"
            onPress={() => console.log("Profile button clicked")}
            component={ReviewList}
          />
          <Tab.Screen
            name="Login"
            onPress={() => console.log("Login button clicked")}
            component={Login}
          />
          <Tab.Screen
            name="add"
            onPress={() => console.log("add button clicked")}
            component={ReviewAdd}
          />
          <Tab.Screen
            name="one"
            onPress={() => console.log("add button clicked")}
            component={Review}
          />

          <Tab.Screen name="AddMovie" component={AddMovie} />
          <Tab.Screen name="AllMovie" component={AllMovies} />
          <Tab.Screen
            name="adminAddMovie"
            onPress={() => console.log("add button clicked")}
            component={AddMovieAdmin}
          />
          <Tab.Screen
            name="adminViewMovie"
            onPress={() => console.log("add button clicked")}
            component={ViewAllMoviesAdmin}
          />
        </Tab.Navigator>
      </Drawer>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
