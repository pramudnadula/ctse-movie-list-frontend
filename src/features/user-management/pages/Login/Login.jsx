import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore, collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
	logoContainer: {
		marginBottom: 50,
	},

	inputView: {
		width: '80%',
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
	loginBtn: {
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
	registerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		gap: 10,
		position: 'absolute',
		bottom: 20,
	},
	logo: {
		height: 200,
		width: 200,
	},
});
function Login() {
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem('isAdmin', String(value));
		} catch (e) {
			console.log(e);
		}
	};
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
			const db = getFirestore();
			const docRef = doc(db, 'users', getAuth().currentUser.uid);
			console.log(getAuth().currentUser.uid);
			getDoc(docRef).then((docs) => {
				storeData(docs.data().isAdmin);
			});

			const movieRef = collection(db, 'userMovie');
			const querySnapshot = await getDocs(query(movieRef, where('uid', '==', getAuth().currentUser.uid)));
			if (querySnapshot.empty) {
				addDoc(movieRef, { uid: getAuth().currentUser.uid });
			}

			Toast.show({
				type: 'success', // success, error, info
				text1: 'Logged in Successfully',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});

			setTimeout(function () {
				navigation.navigate('Movie Man');
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
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={require('../../../../common/logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
			<View style={styles.inputView}>
				<TextInput style={styles.inputText} placeholder="Email" value={email} onChangeText={setEmail} />
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Password"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>
			<View style={styles.registerContainer}>
				<Text
					style={{
						fontSize: 14,
						color: '#fff',
					}}
				>
					Don't have an account ?
				</Text>
				<TouchableOpacity onPress={handleNavigate}>
					<Text
						style={{
							fontSize: 14,
							color: '#fb5b5a',
						}}
					>
						Register
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

export default Login;
