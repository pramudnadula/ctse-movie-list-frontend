import React, { useState, useRef } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './src/features/user-management/pages/Login/Login';
import Register from './src/features/user-management/pages/Register/Register';
import Users from './src/features/user-management/pages/Users/Users';
import ReviewList from './src/features/movie_review/pages/ReviewList';
import ReviewAdd from './src/features/movie_review/pages/ReviewAdd';
import Review from './src/features/movie_review/pages/Review';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import UserPostsList from './src/features/movie_review/pages/UserPostsList';
import ReviewEdit from './src/features/movie_review/pages/ReviewEdit';
import IoniconsHeaderButton from './src/common/IoniconsHeaderButton';
import AddList from './src/features/userMovie/pages/AddList';
import AllList from './src/features/userMovie/pages/AllList';
import EditList from './src/features/userMovie/pages/EditList';
import AddMovieAdmin from './src/features/admin_movie/pages/AddMovieAdmin';
import Toast from 'react-native-toast-message';
import ViewOneMovieAdmin from './src/features/admin_movie/pages/ViewOneMovieAdmin';
import EditMovieAdmin from './src/features/admin_movie/pages/EditMovieAdmin';
import ViewOneMovieUser from './src/features/admin_movie/pages/ViewOneMovieUser';
import CreateUser from './src/features/user-management/pages/CreateUser.jsx/CreateUser';
import EditUser from './src/features/user-management/pages/EditUser.jsx/EditUser';
import Movies from './src/features/admin_movie/pages/Movies';
import SplashScreen from './src/common/SplashScreen';
const SettingsIcon = () => <Ionicons name="ios-settings" size={23} color="white" />;
const HelpIcon = () => <Ionicons name="ios-help-circle" size={23} color="white" />;
const LogoutIcon = () => <Ionicons name="ios-log-out" size={23} color="white" />;
// const User = () => <Ionicons name="person-outline"></Ionicons>;
import { useNavigation } from '@react-navigation/native';
const KebabMenu = ({ navigation }) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const navigationS = useNavigation();
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	return (
		<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
			<Item
				title="Logout"
				iconName="ios-log-out"
				onPress={() => {
					navigationS.navigate('login');
				}}
			/>
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
	const ref = useRef();

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

					if (route.name === 'User') {
						iconName = focused ? 'account' : 'account-outline';
						return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
					} else if (route.name === 'Review') {
						iconName = focused ? 'profile' : 'profile';
						return <AntDesign name={iconName} size={size} color={color} />;
					} else if (route.name === 'Movie') {
						iconName = focused ? 'movie' : 'movie-outline';
						return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
					} else if (route.name === 'My Movie') {
						iconName = focused ? 'file' : 'file-outline';
						return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
					}
				},
				headerShown: false,
				tabBarStyle: { backgroundColor: '#222' },
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
			<Tab.Screen name="Movie" component={Movies} />
			<Tab.Screen name="My Movie" component={AllList} />
			<Tab.Screen name="Review" onPress={() => console.log('Profile button clicked')} component={ReviewList} />
			<Tab.Screen name="User" component={Users} />
		</Tab.Navigator>
	);
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={({ route }) => ({
					headerShown: route.name !== 'login' && route.name !== 'register',
					headerRight: () => <KebabMenu />,
				})}
				initialRouteName="SplashScreen"
				headerMode="none"
			>
				<Stack.Screen name="SplashScreen" component={SplashScreen} />
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen name="register" component={Register} />
				<Stack.Screen name="users" component={Users} />
				<Stack.Screen name="admin" component={CreateUser} />
				<Stack.Screen name="edit-user" component={EditUser} />
				<Stack.Screen name="Movie Man" component={Tabs} />
				<Stack.Screen name="Edit Review" component={ReviewEdit} />
				<Stack.Screen name="listadd" component={AddList} />
				<Stack.Screen name="ledit" component={EditList} />
				<Stack.Screen name="My Review" component={UserPostsList} />
				<Stack.Screen name="View Review" component={Review} />
				<Stack.Screen name="Add Review" component={ReviewAdd} />
				<Stack.Screen name="viewOneMovie" component={ViewOneMovieAdmin} />
				<Stack.Screen name="View Movie" component={ViewOneMovieUser} />
				{/*  // user view */}
				<Stack.Screen name="Admin Add Movie" component={AddMovieAdmin} />
				<Stack.Screen name="Admin Edit Movie" component={EditMovieAdmin} />
				<Stack.Screen name="Movie" component={Movies} />
			</Stack.Navigator>
			<Toast />
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
