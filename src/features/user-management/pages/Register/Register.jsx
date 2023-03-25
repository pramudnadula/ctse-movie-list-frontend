import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CheckBox, Icon } from '@rneui/themed';
import { CheckBoxContainer } from '../../styles/EditUser.style';
import { Image } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
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

	registerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		gap: 10,
		marginBottom: 5,
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
	logo: {
		height: 100,
		width: 100,
	},
	checkboxView: {
		display: 'flex',
	},
	imageText: {
		marginTop: -5,
	},
	checkboxContainer: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		margin: 0,
		padding: 0,
	},
	checkboxText: {
		fontSize: 16,
		fontWeight: 'normal',
		color: '#fff',
	},
	checkedBox: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#fb5b5a',
		borderWidth: 3,
		borderColor: '#FFF',
	},
	uncheckedBox: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#fb5b5a',
	},
	inputViewImage: {
		width: '95%',
		borderRadius: 25,
		borderWidth: 1,
		borderColor: '#ccc',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	logoContainer: {
		marginTop: 20,
		marginBottom: 20,
	},
});

function Register() {
	const navigation = useNavigation();
	const auth = getAuth();
	const database = getFirestore();
	const storage = getStorage();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('male');
	const [photo, setPhoto] = useState('');
	const [imageState, setImageState] = useState('Upload Image');

	const handleImagePicker = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
			});

			if (!result.canceled) {
				const imageRef = ref(storage, `users/${Date.now()}.jpg`);
				setImageState('Uploading Image');
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
				setImageState('Uploaded. Tap to upload different image.');
				Toast.show({
					type: 'success', // success, error, info
					text1: 'Image Uploaded Successfully',
					topOffset: 100,
					visibilityTime: 1000, // if don't set this, it calls the default
				});
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
				isAdmin: false,
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
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={require('../../../../common/logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				automaticallyAdjustKeyboardInsets={true}
				contentInsetAdjustmentBehavior={'automatic'}
			>
				<View style={styles.container1}>
					<View style={styles.inputView}>
						<TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.inputText} />
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Password"
							value={password}
							secureTextEntry={true}
							onChangeText={setPassword}
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Re-enter Password"
							value={tempPassword}
							secureTextEntry={true}
							onChangeText={setTempPassword}
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.inputText} />
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Country"
							value={country}
							onChangeText={setCountry}
							style={styles.inputText}
						/>
					</View>
					<CheckBoxContainer>
						<CheckBox
							checked={gender === 'male'}
							onPress={() => setGender('male')}
							checkedIcon={<View style={styles.checkedBox} />}
							uncheckedIcon={<View style={styles.uncheckedBox} />}
							title="Male"
							containerStyle={styles.checkboxContainer}
							textStyle={styles.checkboxText}
							checkedColor="#007AFF"
						/>
						<CheckBox
							checked={gender === 'female'}
							onPress={() => setGender('female')}
							checkedIcon={<View style={styles.checkedBox} />}
							uncheckedIcon={<View style={styles.uncheckedBox} />}
							title="Female"
							containerStyle={styles.checkboxContainer}
							textStyle={styles.checkboxText}
							checkedColor="#007AFF"
						/>
					</CheckBoxContainer>
					<View style={styles.inputViewImage}>
						<TouchableOpacity onPress={handleImagePicker}>
							<Text style={styles.imageText}>{imageState}</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => handleRegister()} style={styles.registerBtn}>
						<Text style={styles.loginText}>Register</Text>
					</TouchableOpacity>
					<View style={styles.registerContainer}>
						<Text
							style={{
								fontSize: 14,
								color: '#fff',
							}}
						>
							Click here to{' '}
						</Text>
						<TouchableOpacity onPress={handleNavigate}>
							<Text
								style={{
									fontSize: 14,
									color: '#fb5b5a',
								}}
							>
								Log In
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default Register;
