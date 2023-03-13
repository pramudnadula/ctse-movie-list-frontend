import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/common/Home';
//import Login from './src/common/Login';
//import ReviewList from './src/features/movie_review/pages/ReviewList';
import AddMovie from './src/features/userMovie/pages/AddMovie';
import AllMovies from './src/features/userMovie/pages/AllMovies';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            headerShown: false
          }
        }>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="AddMovie" component={AddMovie} />
        <Stack.Screen name="AllMovie" component={AllMovies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
