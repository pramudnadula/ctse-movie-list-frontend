import React, { useState, useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import { ToastProvider } from 'react-native-toast-message';
import Home from './src/common/Home';
import AddMovie from './src/features/userMovie/pages/AddMovie';
import AllMovies from './src/features/userMovie/pages/AllMovies';
import Login from './src/common/Login';
import ReviewList from './src/features/movie_review/pages/ReviewList';
import Sidebar from './src/common/Sidebar';
import ReviewAdd from './src/features/movie_review/pages/ReviewAdd';
import Review from './src/features/movie_review/pages/Review';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import * as Expo from 'expo';
import UserPostsList from './src/features/movie_review/pages/UserPostsList';
import ReviewEdit from './src/features/movie_review/pages/ReviewEdit';
import { useNavigation } from '@react-navigation/native';
import IoniconsHeaderButton from './src/common/IoniconsHeaderButton';
import AddList from './src/features/userMovie/pages/AddList';
import AllList from './src/features/userMovie/pages/AllList';
import EditList from './src/features/userMovie/pages/EditList';
import AddMovieAdmin from './src/features/admin_movie/pages/AddMovieAdmin';
import ViewAllMoviesAdmin from './src/features/admin_movie/pages/ViewAllMoviesAdmin';

const SettingsIcon = () => <Ionicons name="ios-settings" size={23} color="white" />;
const HelpIcon = () => <Ionicons name="ios-help-circle" size={23} color="white" />;
const LogoutIcon = () => <Ionicons name="ios-log-out" size={23} color="white" />;

const KebabMenu = ({ navigation }) => {
	const [menuVisible, setMenuVisible] = useState(false);

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const onHideShowPress = () => {
		toggleMenu();
		return <Login />;
	};

	const onSettingsPress = () => {
		toggleMenu();
		// Navigate to the settings screen
	};

	const onHelpPress = () => {
		toggleMenu();
		// Show help information
	};

	return (
		<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
			<Item title="Menu" iconName="ellipsis-vertical" onPress={toggleMenu} />
			{menuVisible && (
				<>
					<Item title="Hide/Show" iconName="ios-eye-off" onPress={onHideShowPress} />
					<Item title="Settings" iconName="ios-settings" onPress={onSettingsPress} />
					<Item title="Help" iconName="ios-help-circle" onPress={onHelpPress} />
				</>
			)}
		</HeaderButtons>
	);
};

const firebaseConfig = {
	apiKey: 'AIzaSyAP3EmZSGQq7iZieAoXlHUcYw1LsTkWbTA',
	authDomain: 'firbase-sample-85e8e.firebaseapp.com',
	databaseURL: 'https://firbase-sample-85e8e-default-rtdb.firebaseio.com',
	projectId: 'firbase-sample-85e8e',
	storageBucket: 'firbase-sample-85e8e.appspot.com',
	messagingSenderId: '744381209571',
	appId: '1:744381209571:web:6ec94e38f589480ac09ed6',
	measurementId: 'G-CNBC8K39KC',
};

firebase.initializeApp(firebaseConfig);

export default function App() {
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const drawerStyles = {
		drawer: {
			shadowColor: '#000000',
			shadowOpacity: 0.8,
			shadowRadius: 3,
			backgroundColor: '#222',
			panOpenMask: 0.1,
		},
		main: { paddingLeft: 3 },
	};
	const toggleDrawer = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const Tabs = () => (
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

					if (route.name === 'Login') {
						iconName = focused ? 'home' : 'home';
						return <AntDesign name={iconName} size={size} color={color} />;
					} else if (route.name === 'Review') {
						iconName = focused ? 'profile' : 'profile';
						return <AntDesign name={iconName} size={size} color={color} />;
					}
				},
				headerShown: false,
			})}
			tabBarOptions={{
				activeTintColor: 'tomato',
				inactiveTintColor: 'gray',
				style: {
					backgroundColor: 'black',
					borderTopWidth: 0,
					shadowOffset: { width: 5, height: 3 },
					shadowColor: 'black',
					shadowOpacity: 0.5,
					elevation: 5,
					paddingTop: 5,
				},
			}}
		>
			<Tab.Screen name="Review" onPress={() => console.log('Profile button clicked')} component={ReviewList} />
			<Tab.Screen name="Login" onPress={() => console.log('Login button clicked')} component={Login} />
			<Tab.Screen name="add" onPress={() => console.log('add button clicked')} component={ReviewAdd} />
			<Tab.Screen name="listone" onPress={() => console.log('add button clicked')} component={AllList} />
			<Tab.Screen name="my" onPress={() => console.log('add button clicked')} component={AddList} />
			<Tab.Screen
				name="adminAddMovie"
				onPress={() => console.log('add button clicked')}
				component={AddMovieAdmin}
			/>
			<Tab.Screen
				name="adminViewMovie"
				onPress={() => console.log('add button clicked')}
				component={ViewAllMoviesAdmin}
			/>
		</Tab.Navigator>
	);

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={({ route }) => ({
					headerShown: route.name !== 'log',
					headerRight: () => <KebabMenu />,
				})}
			>
				<Stack.Screen name="log" component={Login} />
				<Stack.Screen name="home" component={Tabs} />
				<Stack.Screen name="edit" component={ReviewEdit} />
				<Stack.Screen name="ledit" component={EditList} />
				<Stack.Screen name="list" component={ReviewList} />
				<Stack.Screen name="my" component={UserPostsList} />
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
	containerw: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'relative',
		zIndex: 1,
	},
	menu: {
		position: 'absolute',
		top: 100, // Adjust this value to change the distance between the header and the menu
		right: 0,
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 100,
	},
});
