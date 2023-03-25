import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore, collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#222',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	inputView: {
		width: '80%',
		borderRadius: 25,
		borderColor: '#fff',
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#fff',
	},
	inputText: {
		height: 50,
	},
	loginBtn: {
		width: '40%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10,
		backgroundColor: '#fff',
	},
	loginText: {
		fontSize: 18,
		fontWeight: 900,
	},
	registerText: {
		color: '#fff',
	},
});

function Login() {
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem('isAdmin', String(value))
		} catch (e) {
			console.log(e)
		}
	}
	const auth = getAuth();
	const navigation = useNavigation();

	const [email, setEmail] = useState('kavi@gmail.com');
	const [password, setPassword] = useState('123456');

	const handleLogin = async () => {
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

			await signInWithEmailAndPassword(auth, email, password);
			const db = getFirestore()
			const docRef = doc(db, 'users', getAuth().currentUser.uid);
			console.log(getAuth().currentUser.uid)
			getDoc(docRef).then((docs) => {
				storeData(docs.data().isAdmin)
			})


			const movieRef = collection(db, 'userMovie');
			const querySnapshot = await getDocs(query(movieRef, where('uid', '==', getAuth().currentUser.uid)));
			if (querySnapshot.empty) {
				addDoc(movieRef, { uid: getAuth().currentUser.uid })
			}



			Toast.show({
				type: 'success', // success, error, info
				text1: 'Logged in Successfully',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});

			setTimeout(function () {
				navigation.navigate('home');
			}, 1500);
		} catch (err) {
			console.log(err.code);
			if (err.code === 'auth/wrong-password') {
				Toast.show({
					type: 'error', // success, error, info
					text1: 'Invalid Password.',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
			} else if (err.code === 'auth/user-not-found') {
				Toast.show({
					type: 'error', // success, error, info
					text1: 'User not found.',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
			} else if (err.code === 'auth/invalid-email') {
				Toast.show({
					type: 'error', // success, error, info
					text1: 'Invalid Email.',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
				});
			}
		}
	};

	const handleNavigate = () => {
		navigation.navigate('register');
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.container}>
			<View style={style.inputView}>
				<TextInput style={style.inputText} placeholder="Email" value={email} onChangeText={setEmail} />
			</View>
			<View style={style.inputView}>
				<TextInput
					style={style.inputText}
					placeholder="Password"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<Text style={style.registerText} onPress={handleNavigate}>
				Click Here to Register
			</Text>
			<TouchableOpacity onPress={handleLogin} style={style.loginBtn}>
				<Text style={style.loginText}>LOGIN</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

export default Login;
