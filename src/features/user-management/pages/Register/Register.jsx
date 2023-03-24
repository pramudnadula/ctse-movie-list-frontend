import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CheckBox } from '@rneui/themed';
import { Stack } from 'react-native-flex-layout';

const style = StyleSheet.create({
	scrollView: {
		flexGrow: 1,
		backgroundColor: '#222',
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginTop: 40,
		marginBottom: 40,
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
});

function Register() {
	const navigation = useNavigation();
	const auth = getAuth();
	const database = getFirestore();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('male');
	const [photo, setPhoto] = useState('');
	const [loading, setLoading] = useState(false);

	const handleImagePicker = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
			});
			setLoading(true);

			if (!result.canceled) {
				const storage = getStorage();
				const imageRef = ref(storage, `users/${Date.now()}.jpg`);
				const blob = await new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.onload = () => {
						resolve(xhr.response);
					};
					xhr.onerror = (e) => {
						console.log(e);
						reject(new TypeError('Network request failed'));
					};
					xhr.responseType = 'blob';
					xhr.open('GET', result.uri, true);
					xhr.send(null);
				});

				await uploadBytes(imageRef, blob);
				const imageUrl = await getDownloadURL(imageRef);
				setPhoto(imageUrl);
				Toast.show({
					type: 'success', // success, error, info
					text1: 'Image Uploaded Successfully',
					topOffset: 100,
					visibilityTime: 1000, // if don't set this, it calls the default
				});
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			Toast.show({
				type: 'error', // success, error, info
				text1: 'Something went wrong. Image not uploaded',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});
		}
	};

	const handleNavigate = () => {
		navigation.navigate('login');
	};

	const handleRegister = async () => {
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
				gender,
				country,
				photo,
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
				navigation.navigate('login');
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
		<ScrollView
			contentContainerStyle={style.scrollView}
			automaticallyAdjustKeyboardInsets={true}
			contentInsetAdjustmentBehavior={'automatic'}
		>
			<View style={style.container}>
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
				<Stack row align="center" spacing={4}>
					<CheckBox
						checked={gender === 'male'}
						onPress={() => setGender('male')}
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						title="Male"
					/>
					<CheckBox
						checked={gender === 'female'}
						onPress={() => setGender('female')}
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						title="Female"
					/>
				</Stack>
				<View style={style.inputView}>
					<TouchableOpacity onPress={handleImagePicker}>
						<Text>Image</Text>
					</TouchableOpacity>
				</View>
				<Text style={style.loginText} onPress={handleNavigate}>
					Click Here to Login
				</Text>
				<TouchableOpacity style={style.registerBtn} onPress={() => handleRegister()}>
					<Text style={style.registerText}>Register</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

export default Register;
