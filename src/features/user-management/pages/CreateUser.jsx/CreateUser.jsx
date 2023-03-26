import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Image } from 'react-native';

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#222',
	},
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
		gap: 10,
	},
	title: {
		color: '#fb5b5a',
		fontSize: 35,
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 20,
	},

	inputView: {
		width: '95%',
		borderRadius: 25,
		borderWidth: 1,
		borderColor: '#ccc',
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#fff',
	},
	inputText: {
		height: 50,
	},
	registerBtn: {
		width: '40%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10,
		backgroundColor: '#fff',
	},
	registerText: {
		fontSize: 18,
		fontWeight: 900,
	},
	loginText: {
		color: '#fff',
	},
	checkboxView: {
		display: 'flex',
	},
	logoContainer: {
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'center',
	},
	logo: {
		height: 100,
		width: 100,
	},
	registerBtn: {
		width: '50%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		marginBottom: 10,
		backgroundColor: '#fb5b5a',
	},
	loginText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
	},
});

function CreateUser() {
	const navigation = useNavigation();
	const auth = getAuth();
	const database = getFirestore();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');

	const handleCreateUser = async () => {
		try {
			if (email === '') {
				Toast.show({
					type: 'error', // success, error, info
					text1: "Email Field can't be empty",
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
				return;
			}
			if (password === '') {
				Toast.show({
					type: 'error', // success, error, info
					text1: "Password Field can't be empty",
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
				return;
			}
			if (password !== tempPassword) {
				Toast.show({
					type: 'error', // success, error, info
					text1: "Passwords don't match.",
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
				return;
			}
			if (name === '') {
				Toast.show({
					type: 'error', // success, error, info
					text1: "Name Field can't be empty",
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
				return;
			}

			const userObj = {
				email,
				password,
				name,
				gender: '',
				country,
				photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
				isAdmin: true,
			};

			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			const userRef = doc(database, 'users', userCredentials.user.uid);
			await setDoc(userRef, userObj);
			console.log('User Created Successfully');
			Toast.show({
				type: 'success', // success, error, info
				text1: 'User Created Successfully',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});
			setTimeout(function () {
				navigation.navigate('users');
			}, 1500);
		} catch (err) {
			console.log(err.code);
			if (err.code === 'auth/email-already-in-use') {
				Toast.show({
					type: 'error', // success, error, info
					text1: 'Email already in use.',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
			} else if (err.code === 'auth/weak-password') {
				Toast.show({
					type: 'error', // success, error, info
					text1: 'Weak Password. Need atleast 6 characters.',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
			} else {
				Toast.show({
					type: 'error', // success, error, info
					text1: 'Something went wrong',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
			}
		}
	};

	return (
		<View style={style.container}>
			<View style={style.logoContainer}>
				<Image source={require('../../../../common/logo.png')} style={style.logo} resizeMode="contain" />
				<Text style={{ fontSize: 20, color: '#fb5b5a', fontWeight: 'bold' }}>Create User</Text>
			</View>
			<ScrollView automaticallyAdjustKeyboardInsets={true} contentInsetAdjustmentBehavior={'automatic'}>
				<View style={style.container1}>
					<View style={style.inputView}>
						<TextInput placeholder="Email" value={email} onChangeText={setEmail} style={style.inputText} />
					</View>
					<View style={style.inputView}>
						<TextInput
							placeholder="Password"
							value={password}
							secureTextEntry={true}
							onChangeText={setPassword}
							style={style.inputText}
						/>
					</View>
					<View style={style.inputView}>
						<TextInput
							placeholder="Re-enter Password"
							value={tempPassword}
							secureTextEntry={true}
							onChangeText={setTempPassword}
							style={style.inputText}
						/>
					</View>
					<View style={style.inputView}>
						<TextInput placeholder="Name" value={name} onChangeText={setName} style={style.inputText} />
					</View>
					<View style={style.inputView}>
						<TextInput
							placeholder="Country"
							value={country}
							onChangeText={setCountry}
							style={style.inputText}
						/>
					</View>
					<TouchableOpacity style={style.registerBtn} onPress={() => handleCreateUser()}>
						<Text style={style.registerText}>Create</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

export default CreateUser;
