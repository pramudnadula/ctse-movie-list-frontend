import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		navigation.navigate('home');
	};

	const isDarkModeEnabled = true;

	const inputStyles = {
		backgroundColor: isDarkModeEnabled ? '#212121' : '#fff',
		color: isDarkModeEnabled ? '#fff' : '#000',
	};

	const containerStyles = {
		backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
	};

	return (
		<View style={[styles.container, containerStyles]}>
			<StatusBar barStyle={isDarkModeEnabled ? 'light-content' : 'dark-content'} />
			<Text style={[styles.logo, { color: isDarkModeEnabled ? '#fff' : '#fb5b5a' }]}>Movie Manager</Text>
			<View style={[styles.inputView, inputStyles]}>
				<TextInput
					style={[styles.inputText, inputStyles]}
					placeholder="Username"
					placeholderTextColor={isDarkModeEnabled ? '#cfcfcf' : '#003f5c'}
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={[styles.inputView, inputStyles]}>
				<TextInput
					style={[styles.inputText, inputStyles]}
					placeholder="Password"
					placeholderTextColor={isDarkModeEnabled ? '#cfcfcf' : '#003f5c'}
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<TouchableOpacity
				style={[styles.loginBtn, { backgroundColor: isDarkModeEnabled ? '#fff' : '#fb5b5a' }]}
				onPress={handleLogin}
			>
				<Text style={[styles.loginText, { color: isDarkModeEnabled ? '#fb5b5a' : '#fff' }]}>LOGIN</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 50,
		marginBottom: 40,
	},
	inputView: {
		width: '80%',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
	},
	inputText: {
		height: 50,
	},
	loginBtn: {
		width: '80%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10,
	},
	loginText: {},
});

export default Login;
