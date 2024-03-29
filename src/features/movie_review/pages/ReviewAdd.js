import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, View, Switch, TouchableOpacity, ScrollView, Button } from 'react-native';
import {
	Container,
	ImageContainer,
	SelectContainer,
	Input,
	InputContainer,
	InputTextArea,
	InputView,
	RadioContainer,
	RadioHolder,
	SelectImage,
	TitleText,
	SwichGroup,
	OneSwitch,
	AddImage,
	VisibleImageBox,
	EditButton,
} from '../styles/add';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from 'expo-image-picker';
import RatingInput from '../components/Rating';
import { POST } from '../../../common/httphelper';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Loading from '../components/Loading';
import FloatingButton from '../components/FloatingButton';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
export default function ReviewAdd() {
	const navigation = useNavigation();
	const [title, setTitle] = useState('');
	const [type, setType] = useState(1);
	const [mname, setmname] = useState('');
	const [des, setdes] = useState('');
	const [rate, setrate] = useState('');
	const [img1, setimg1] = useState('');
	const [img2, setimg2] = useState('');
	const [img3, setimg3] = useState('');
	const [img4, setimg4] = useState('');
	const [vlink, setvlink] = useState('');
	const [index, setindex] = useState(0);
	const [isValiddes, setisValiddes] = useState(true);
	const [isValidtitle, setisValidtitle] = useState(true);
	const [isValidmname, setisValidmname] = useState(true);
	const [isValidvlink, setisValidvlink] = useState(true);
	const [isValidim1, setisValidim1] = useState(true);
	const [isValidim2, setisValidim2] = useState(true);
	const [isValidim3, setisValidim3] = useState(true);
	const [isValidim4, setisValidim4] = useState(true);
	const [loading, setloading] = useState(false);
	const [isEnabled1, setIsEnabled1] = useState(false);
	const [isEnabled2, setIsEnabled2] = useState(false);
	const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
	const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
	const selectedone = (value) => {
		setrate(value);
	};
	const getVideoId = (url) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
		const match = url.match(regExp);
		if (match && match[2]) {
			return match[2];
		} else {
			return null;
		}
	};
	const validate = () => {
		if (title === '') {
			setisValidtitle(false);
			return false;
		} else {
			setisValidtitle(true);
		}
		if (mname === '') {
			setisValidmname(false);
			return false;
		} else {
			setisValidmname(true);
		}
		if (des === '') {
			setisValiddes(false);
			return false;
		} else {
			setisValiddes(true);
		}

		if (vlink === '') {
			setisValidvlink(false);
			return false;
		} else {
			setisValidvlink(true);
		}
		if (type === 1) {
			if (img1 === '') {
				setisValidim1(false);
				return false;
			} else {
				setisValidim1(true);
			}
		} else if (type === 2) {
			if (img1 === '') {
				setisValidim1(false);
				return false;
			} else {
				setisValidim1(true);
			}
			if (img2 === '') {
				setisValidim2(false);
				return false;
			} else {
				setisValidim2(true);
			}
			if (img3 === '') {
				setisValidim3(false);
				return false;
			} else {
				setisValidim3(true);
			}
		} else {
			if (img1 === '') {
				setisValidim1(false);
				return false;
			} else {
				setisValidim1(true);
			}
			if (img2 === '') {
				setisValidim2(false);
				return false;
			} else {
				setisValidim2(true);
			}
			if (img3 === '') {
				setisValidim3(false);
				return false;
			} else {
				setisValidim3(true);
			}
			if (img4 === '') {
				setisValidim4(false);
				return false;
			} else {
				setisValidim4(true);
			}
		}
		return true;
	};
	const handleFormSubmit = async () => {
		const valid = validate();
		if (!valid) {
			return;
		}
		const ob = {
			title,
			mname,
			Description: des,
			img1,
			img2,
			img3,
			img4,
			type,
			vlink: getVideoId(vlink),
			rate,
			comment: isEnabled2,
			like: isEnabled1,
			likes: 0,
			comments: 0,
			uid: getAuth().currentUser.uid,
		};
		const db = getFirestore();
		try {
			const docRef = await addDoc(collection(db, 'review'), ob);
			Toast.show({
				type: 'success',
				text1: 'Post Added Successfully',
				topOffset: 100,
				visibilityTime: 1500,
			});
			navigation.navigate('Review');
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};
	const handleImagePicker = async (index) => {
		setindex(index);
		try {
			const result = await launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
			});
			setloading(true);
			if (!result.canceled) {
				const storage = getStorage();
				const imageRef = ref(storage, `images/${Date.now()}.jpg`);
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
					xhr.open('GET', result.assets[0].uri, true);
					xhr.send(null);
				});

				await uploadBytes(imageRef, blob);
				const imageUrl = await getDownloadURL(imageRef);
				if (index === 1) {
					setimg1(imageUrl);
					setisValidim1(true);
				} else if (index === 2) {
					setimg2(imageUrl);
					setisValidim2(true);
				} else if (index === 3) {
					setimg3(imageUrl);
					setisValidim3(true);
				} else if (index === 4) {
					setimg4(imageUrl);
					setisValidim4(true);
				}
				setloading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={styles.label}>Select the Template:</Text>
					<SelectContainer>
						<ImageContainer>
							<SelectImage source={require('../../../../assets/im.jpg')} />
							<RadioButton
								color="#fb5b5a"
								status={type === 1 ? 'checked' : 'unchecked'}
								onPress={() => setType(1)}
							/>
						</ImageContainer>
						<ImageContainer>
							<SelectImage source={require('../../../../assets/im1.png')} />
							<RadioButton
								color="#fb5b5a"
								status={type === 2 ? 'checked' : 'unchecked'}
								onPress={() => setType(2)}
							/>
						</ImageContainer>
						<ImageContainer>
							<SelectImage source={require('../../../../assets/im2.png')} />
							<RadioButton
								color="#fb5b5a"
								status={type === 3 ? 'checked' : 'unchecked'}
								onPress={() => setType(3)}
							/>
						</ImageContainer>
					</SelectContainer>
					<Text style={styles.label}>Title:</Text>
					<TextInput
						style={[styles.input, !isValidtitle && styles.invalidInput]}
						value={title}
						onChangeText={setTitle}
						placeholder="Enter the Title"
						placeholderTextColor="#B3B3B3"
					/>
					{!isValidtitle && <Text style={styles.errorText}>Please enter a valid title</Text>}

					<Text style={styles.label}>Movie Name:</Text>
					<TextInput
						style={[styles.input, !isValidmname && styles.invalidInput]}
						value={mname}
						onChangeText={setmname}
						placeholder="Enter the Movie name"
						placeholderTextColor="#B3B3B3"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					{!isValidmname && <Text style={styles.errorText}>Please enter a valid Movie Name</Text>}

					<Text style={styles.label}>Description:</Text>
					<TextInput
						style={[styles.textArea, !isValiddes && styles.invalidInput]}
						value={des}
						onChangeText={setdes}
						placeholder="Type the description here"
						placeholderTextColor="#B3B3B3"
						multiline={true}
						numberOfLines={5}
					/>
					{!isValiddes && <Text style={styles.errorText}>Please enter a valid description</Text>}
					<Text style={styles.label}>Trailer Link:</Text>
					<TextInput
						style={[styles.textArea, !isValidvlink && styles.invalidInput]}
						value={vlink}
						onChangeText={setvlink}
						placeholder="Type the Video Link here"
						placeholderTextColor="#B3B3B3"
						multiline={true}
						numberOfLines={5}
					/>
					{!isValidvlink && <Text style={styles.errorText}>Please enter a valid link</Text>}
					<Text style={styles.label}>Images:</Text>
					{/* <View style={styles.imageUploadContainer}>
                        {type === 1 || type === 2 || type === 3 ? <>
                            <TouchableOpacity style={styles.imageUploader} onPress={() => handleImagePicker(0)}>
                                <Text style={styles.imageUploaderText}>Upload Image 1</Text>
                            </TouchableOpacity>
                        </> : <></>}

                        {type === 2 || type === 3 ? <>
                            <TouchableOpacity style={styles.imageUploader} onPress={() => handleImagePicker(1)}>
                                <Text style={styles.imageUploaderText}>Upload Image 2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageUploader} onPress={() => handleImagePicker(2)}>
                                <Text style={styles.imageUploaderText}>Upload Image 3</Text>
                            </TouchableOpacity>
                        </> : <></>}

                        {type === 3 ? <>
                            <TouchableOpacity style={styles.imageUploader} onPress={() => handleImagePicker(3)}>
                                <Text style={styles.imageUploaderText}>Upload Image 4</Text>
                            </TouchableOpacity>
                        </> : <></>}

                    </View> */}
					<View style={styles.imageUploadContainer}>
						{type === 1 || type === 2 || type === 3 ? (
							<>
								<Text style={styles.label}>Image 1 url:</Text>

								{img1 !== '' ? (
									<>
										<View style={styles.showpic}>
											<Image style={styles.showim} source={{ uri: img1 }} />
											<TouchableOpacity onPress={() => setimg1('')}>
												<View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										{loading && index === 1 ? (
											<Loading />
										) : (
											<>
												<TouchableOpacity
													style={styles.buttond}
													onPress={() => handleImagePicker(1)}
												>
													<Text style={styles.buttonText}>Image 1</Text>
												</TouchableOpacity>
											</>
										)}
									</>
								)}
								{!isValidim1 && <Text style={styles.errorText}>Please enter a valid url</Text>}
							</>
						) : (
							<></>
						)}

						{type === 2 || type === 3 ? (
							<>
								<Text style={styles.label}>Image 2 url:</Text>
								{img2 !== '' ? (
									<>
										<View style={styles.showpic}>
											<Image style={styles.showim} source={{ uri: img2 }} />
											<TouchableOpacity onPress={() => setimg2('')}>
												<View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										{loading && index === 2 ? (
											<Loading />
										) : (
											<>
												<TouchableOpacity
													style={styles.buttond}
													onPress={() => handleImagePicker(2)}
												>
													<Text style={styles.buttonText}>Image 2</Text>
												</TouchableOpacity>
											</>
										)}
									</>
								)}

								{!isValidim2 && <Text style={styles.errorText}>Please enter a valid url</Text>}
								<Text style={styles.label}>Image 3 url:</Text>

								{img3 !== '' ? (
									<>
										<View style={styles.showpic}>
											<Image style={styles.showim} source={{ uri: img3 }} />
											<TouchableOpacity onPress={() => setimg3('')}>
												<View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										{loading && index === 3 ? (
											<Loading />
										) : (
											<>
												<TouchableOpacity
													style={styles.buttond}
													onPress={() => handleImagePicker(3)}
												>
													<Text style={styles.buttonText}>Image 3</Text>
												</TouchableOpacity>
											</>
										)}
									</>
								)}

								{!isValidim3 && <Text style={styles.errorText}>Please enter a valid url</Text>}
							</>
						) : (
							<></>
						)}

						{type === 3 ? (
							<>
								<Text style={styles.label}>Image 4 url:</Text>
								{img4 !== '' ? (
									<>
										<View style={styles.showpic}>
											<Image style={styles.showim} source={{ uri: img4 }} />
											<TouchableOpacity onPress={() => setimg4('')}>
												<View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										{loading && index === 4 ? (
											<Loading />
										) : (
											<>
												<TouchableOpacity
													style={styles.buttond}
													onPress={() => handleImagePicker(4)}
												>
													<Text style={styles.buttonText}>Image 4</Text>
												</TouchableOpacity>
											</>
										)}
									</>
								)}

								{!isValidim4 && <Text style={styles.errorText}>Please enter a valid url</Text>}
							</>
						) : (
							<></>
						)}
					</View>

					<RatingInput selectedone={selectedone} />

					<SwichGroup>
						<OneSwitch>
							<Text style={styles.label}>Likes</Text>
							<Switch
								trackColor={{ false: '#767577', true: '#fb5b5a' }}
								thumbColor={isEnabled1 ? '#fb5b5a' : '#f4f3f4'}
								ios_backgroundColor="#3e3e3e"
								onValueChange={toggleSwitch1}
								value={isEnabled1}
							/>
						</OneSwitch>

						<OneSwitch>
							<Text style={styles.label}>Comments</Text>
							<Switch
								trackColor={{ false: '#767577', true: '#fb5b5a' }}
								thumbColor={isEnabled2 ? '#fb5b5a' : '#f4f3f4'}
								ios_backgroundColor="#3e3e3e"
								onValueChange={toggleSwitch2}
								value={isEnabled2}
							/>
						</OneSwitch>
					</SwichGroup>
					<TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	errorText: {
		color: 'red',
		fontSize: 16,
		marginTop: 5,
		marginBottom: 8,
	},
	invalidInput: {
		borderColor: 'red',
		borderWidth: 2,
	},
	container: {
		flex: 1,
		backgroundColor: '#121212',
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		margin: 20,
		width: '80%',
		backgroundColor: '#1E1E1E',
		padding: 20,
		borderRadius: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#FFFFFF',
		marginBottom: 5,
	},
	input: {
		backgroundColor: '#383838',
		padding: 10,
		borderRadius: 5,
		color: '#FFFFFF',
		marginBottom: 15,
	},
	textArea: {
		backgroundColor: '#383838',
		padding: 10,
		borderRadius: 5,
		color: '#FFFFFF',
		height: 100,
		marginBottom: 15,
		textAlignVertical: 'top',
	},
	button: {
		backgroundColor: '#fb5b5a',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttond: {
		backgroundColor: '#383838',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 18,
	},

	imageUploadersContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		marginBottom: 20,
	},
	imageUploader: {
		backgroundColor: '#333',
		borderRadius: 5,
		padding: 10,
		width: '60%',
		alignItems: 'center',
		marginBottom: 8,
	},
	imageUploaderText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	showpic: {
		display: 'flex',
		flexDirection: 'row',
		height: 200,
		width: 130,
		alignContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	showim: {
		width: '100%',
		height: '100%',
	},
	darkButton: {
		backgroundColor: '#121212',
		color: 'black',
		borderRadius: 5,
		padding: 10,
	},
});
