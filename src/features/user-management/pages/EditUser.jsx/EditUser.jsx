import { getAuth } from '@firebase/auth';
import { collection, doc, getDoc, getFirestore, updateDoc } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { useNavigation } from '@react-navigation/core';
import { CheckBox } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack } from 'react-native-flex-layout';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Loading from '../../../movie_review/components/Loading';
import * as ImagePicker from 'expo-image-picker';
import { CheckBoxContainer } from '../../styles/EditUser.style';
import { Image } from 'react-native';

const style = StyleSheet.create({
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
		color: '#fb5b5a',
		fontSize: 20,
		fontWeight: 'bold',
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

function EditUser() {
	const auth = getAuth();
	const database = getFirestore();
	const navigation = useNavigation();
	const storage = getStorage();

	const [user, setUser] = useState({});
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('male');
	const [photo, setPhoto] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [imageState, setImageState] = useState('Upload Image');

	const handleGetUserDetails = async () => {
		try {
			setIsLoading(true);
			const docRef = doc(database, 'users', auth.currentUser.uid);
			const result = await getDoc(docRef);
			setUser(result.data());
			setEmail(result.data().email);
			setPassword(result.data().password);
			setTempPassword(result.data().password);
			setName(result.data().name);
			setCountry(result.data().country);
			setGender(result.data().gender);
			setPhoto(result.data().photo);

			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

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

	const handleUpdateUser = async () => {
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

			const usersRef = collection(database, 'users');
			await updateDoc(doc(usersRef, auth.currentUser.uid), userObj);
			console.log('Document successfully updated!');
			Toast.show({
				type: 'success', // success, error, info
				text1: 'Updated Successfully',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});
			navigation.navigate('users');
		} catch (err) {
			console.log(err);
			Toast.show({
				type: 'error', // success, error, info
				text1: 'Something went wrong',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});
		}
	};

	useEffect(() => {
		handleGetUserDetails();
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<View style={style.container}>
					<View style={style.logoContainer}>
						<Text style={style.logo}>Update User</Text>
					</View>

					<ScrollView automaticallyAdjustKeyboardInsets={true} contentInsetAdjustmentBehavior={'automatic'}>
						<View style={style.container1}>
							<View style={style.inputView}>
								<TextInput
									placeholder="Email"
									value={email}
									onChangeText={setEmail}
									style={style.inputText}
								/>
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
								<TextInput
									placeholder="Name"
									value={name}
									onChangeText={setName}
									style={style.inputText}
								/>
							</View>
							<View style={style.inputView}>
								<TextInput
									placeholder="Country"
									value={country}
									onChangeText={setCountry}
									style={style.inputText}
								/>
							</View>
							<CheckBoxContainer>
								<CheckBox
									checked={gender === 'male'}
									onPress={() => setGender('male')}
									checkedIcon={<View style={style.checkedBox} />}
									uncheckedIcon={<View style={style.uncheckedBox} />}
									title="Male"
									containerStyle={style.checkboxContainer}
									textStyle={style.checkboxText}
									checkedColor="#007AFF"
								/>
								<CheckBox
									checked={gender === 'female'}
									onPress={() => setGender('female')}
									checkedIcon={<View style={style.checkedBox} />}
									uncheckedIcon={<View style={style.uncheckedBox} />}
									title="Female"
									containerStyle={style.checkboxContainer}
									textStyle={style.checkboxText}
									checkedColor="#007AFF"
								/>
							</CheckBoxContainer>
							<View style={style.inputViewImage}>
								<TouchableOpacity onPress={handleImagePicker}>
									<Text style={style.imageText}>{imageState}</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity onPress={handleUpdateUser} style={style.registerBtn}>
								<Text style={style.loginText}>Update</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			)}
		</>
	);
}

export default EditUser;
