import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Image,
	TextInput,
	View,
	ScrollView,
	Button,
	Text,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ImageContainer, SelectContainer, SelectImage } from '../styles/addMovieStyles';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import RatingInput from '../components/Rating';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const EditMovieAdmin = () => {
	const db = getFirestore();
	const store = getStorage();
	const route = useRoute();
	const { mid } = route.params;
	console.log(mid);
	//! get movie data from firebase
	const [movieData, setMovieData] = useState(null);

	const fetchMovieData = async () => {
		try {
			const movieRef = doc(db, 'AdminMovies', mid);
			const movieSnapshot = await getDoc(movieRef);
			if (movieSnapshot.exists()) {
				setMovieData(movieSnapshot.data());
			} else {
				console.log('Movie not found');
			}
		} catch (error) {
			console.log(error);
		}
	};
	console.log(movieData);

	useEffect(() => {
		fetchMovieData();
	}, [db, mid]);

	//! get movie data from firebase and set it to state
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState(1);
	const [image1, setImage1] = useState('');
	const [image2, setImage2] = useState('');
	const [image3, setImage3] = useState('');
	const [image4, setImage4] = useState('');
	const [rate, setRate] = useState(5);
	const [genre, setGenre] = useState('');
	const [year, setYear] = useState('');
	const [duration, setDuration] = useState('');
	const [isSeries, setIsSeries] = useState(false);

	const [rating, setRating] = useState(0);
	useEffect(() => {
		setTitle(movieData?.title);
		setDescription(movieData?.description);
		setType(movieData?.type);
		setImage1(movieData?.image1);
		setImage2(movieData?.image2);
		setImage3(movieData?.image3);
		setImage4(movieData?.image4);
		setRate(rating);
		setGenre(movieData?.genre);
		setYear(movieData?.year);
		setDuration(movieData?.duration);
		setIsSeries(movieData?.isSeries);
		setRating(movieData?.rate);
	}, [movieData, mid]);

	const navigation = useNavigation();
	const genres = [
		'Action',
		'Comedy',
		'Drama',
		'Horror',
		'Science Fiction',
		'Romance',
		'Thriller',
		'Animation',
		'Adventure',
		'Fantasy',
		'Crime',
		'Documentary',
		'Musical',
		'Mystery',
		'War',
		'Western',
	];
	const currentYear = new Date().getFullYear() + 2;
	const years = [];
	for (let year = 1900; year <= currentYear; year++) {
		years.push(year.toString());
	}
	years.reverse();

	const [isValidim1, setisValidim1] = useState(true);
	const [isValidim2, setisValidim2] = useState(true);
	const [isValidim3, setisValidim3] = useState(true);
	const [isValidim4, setisValidim4] = useState(true);

	const selectDone = (value) => {
		setRate(value);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		// update movie in Firebase
		const db = getFirestore();
		const storage = getStorage();
		const moviesRef = collection(db, 'AdminMovies');
		const movieId = mid; // get the movie ID from the route params
		const updatedMovie = {
			title: title.toLowerCase(),
			description,
			type,
			image1,
			image2,
			image3,
			image4,
			rate,
			genre,
			year,
			duration,
			isSeries,
		};

		function checkRequiredField(field, message) {
			if (field === '') {
				Toast.show({
					type: 'error',
					text1: 'Required Field',
					topOffset: 100,
					visibilityTime: 1500,
					text2: message,
				});
				return true;
			}
			return false;
		}

		if (
			checkRequiredField(title, 'Title is required ⚠️') ||
			checkRequiredField(description, 'Description is required ⚠️') ||
			checkRequiredField(genre, 'Genre is required ⚠️') ||
			checkRequiredField(year, 'Year is required ⚠️') ||
			checkRequiredField(duration, 'Duration is required ⚠️') ||
			checkRequiredField(image1, 'Image 1 is required ⚠️') ||
			checkRequiredField(rate, 'Rate is required ⚠️') ||
			(type === 2 && checkRequiredField(image2, 'Image 2 is required ⚠️')) ||
			(type === 2 && checkRequiredField(image3, 'Image 3 is required ⚠️')) ||
			(type === 3 && checkRequiredField(image2, 'Image 2 is required ⚠️')) ||
			(type === 3 && checkRequiredField(image3, 'Image 3 is required ⚠️')) ||
			(type === 3 && checkRequiredField(image4, 'Image 4 is required ⚠️'))
		) {
			return;
		}

		// Update the movie document with the given ID
		updateDoc(doc(moviesRef, movieId), updatedMovie)
			.then(() => {
				console.log('Document successfully updated!');
				Toast.show({
					type: 'success', // success, error, info
					text1: 'Updated Successfully',
					topOffset: 100,
					visibilityTime: 1500, // if don't set this, it calls the default
					text2: 'Movie Updated Successfully ✅',
				});
				navigation.navigate('Admin Movie');
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
			});
	};

	const handleImagePicker = async (index) => {
		try {
			const result = await launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
			});

			if (!result.canceled) {
				// Get the Firebase storage reference for the image
				const storage = getStorage();
				const imageRef = ref(storage, `images/${Date.now()}.jpg`);

				// Convert the image to bytes for upload
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
					xhr.open('GET', result.assets[0].uri ? result.assets[0].uri : '', true);
					xhr.send(null);
				});

				// Upload the bytes to Firebase storage
				await uploadBytes(imageRef, blob);
				const imageUrl = await getDownloadURL(imageRef);
				if (index === 1) {
					setImage1(imageUrl);
					setisValidim1(true);
				} else if (index === 2) {
					setImage2(imageUrl);
					setisValidim2(true);
				} else if (index === 3) {
					setImage3(imageUrl);
					setisValidim3(true);
				} else if (index === 4) {
					setImage4(imageUrl);
					setisValidim4(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (type === 1) {
			setImage2('');
			setImage3('');
			setImage4('');
		}
		if (type === 2) {
			setImage4('');
		}
	}, [type]);

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={styles.label}>Title: </Text>
					<TextInput
						style={styles.input}
						placeholder="Title"
						placeholderTextColor="#B3B3B3"
						value={title}
						onChangeText={(text) => setTitle(text)}
					/>
					<Text style={styles.label}>Description: </Text>
					<TextInput
						style={styles.textArea}
						placeholder="Description"
						placeholderTextColor="#B3B3B3"
						value={description}
						onChangeText={(text) => setDescription(text)}
					/>
					<Text style={styles.label}>Genre: </Text>
					<Picker
						selectedValue={genre}
						style={styles.input}
						placeholder="Genre"
						placeholderTextColor="#B3B3B3"
						onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
					>
						<Picker.Item label="Select Genre" value="" />
						{genres.map((item, index) => {
							return <Picker.Item label={item} value={item} key={index} />;
						})}
					</Picker>
					<Text style={styles.label}>Year: </Text>
					<Picker
						selectedValue={year}
						style={styles.input}
						placeholder="Year"
						placeholderTextColor="#B3B3B3"
						onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
					>
						<Picker.Item label="Select Year" value="Select Year" />
						{years.map((item, index) => {
							return <Picker.Item label={item} value={item} key={index} />;
						})}
					</Picker>
					<Text style={styles.label}>Duration: </Text>
					<TextInput
						style={styles.input}
						placeholder="Duration (in minutes)"
						placeholderTextColor="#B3B3B3"
						value={duration?.toString()}
						keyboardType="numeric"
						onChangeText={(text) => {
							if (/^\d+$/.test(text)) {
								const durationValue = parseInt(text);
								if (durationValue > 0) {
									setDuration(durationValue);
								} else {
									setDuration(null);
								}
							} else {
								setDuration(null);
							}
						}}
					/>

					<Text style={styles.label}>Is Series: </Text>
					<View style={styles.radioContainer}>
						<View style={styles.radio}>
							<Text style={styles.label}>No: </Text>
							<RadioButton
								color="#fb5b5a"
								status={isSeries === false ? 'checked' : 'unchecked'}
								onPress={() => setIsSeries(false)}
							/>
						</View>
						<View style={styles.radio}>
							<Text style={styles.label}>Yes: </Text>
							<RadioButton
								color="#fb5b5a"
								status={isSeries === true ? 'checked' : 'unchecked'}
								onPress={() => setIsSeries(true)}
							/>
						</View>
					</View>
					<Text style={styles.label}>Select Image Template:</Text>
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
					<View>
						{type === 1 || type === 2 || type === 3 ? (
							<>
								<Text style={styles.label}>Image 1 url:</Text>

								{image1 !== '' ? (
									<>
										<View style={styles.showPicture}>
											<Image style={styles.showImage} source={{ uri: image1 }} />
											<TouchableOpacity onPress={() => setImage1('')}>
												<View
													style={{
														padding: 8,
														alignSelf: 'center',
														marginLeft: 40,
													}}
												>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										<TouchableOpacity
											style={styles.buttonImagePicker}
											onPress={() => handleImagePicker(1)}
										>
											<Text style={styles.buttonText}>Image 1</Text>
										</TouchableOpacity>
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
								{image2 !== '' ? (
									<>
										<View style={styles.showPicture}>
											<Image style={styles.showImage} source={{ uri: image2 }} />
											<TouchableOpacity onPress={() => setImage2('')}>
												<View
													style={{
														padding: 8,
														alignSelf: 'center',
														marginLeft: 40,
													}}
												>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										<TouchableOpacity
											style={styles.buttonImagePicker}
											onPress={() => handleImagePicker(2)}
										>
											<Text style={styles.buttonText}>Image 2</Text>
										</TouchableOpacity>
									</>
								)}

								{!isValidim2 && <Text style={styles.errorText}>Please enter a valid url</Text>}
								<Text style={styles.label}>Image 3 url:</Text>

								{image3 !== '' ? (
									<>
										<View style={styles.showPicture}>
											<Image style={styles.showImage} source={{ uri: image3 }} />
											<TouchableOpacity onPress={() => setImage3('')}>
												<View
													style={{
														padding: 8,
														alignSelf: 'center',
														marginLeft: 40,
													}}
												>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										<TouchableOpacity
											style={styles.buttonImagePicker}
											onPress={() => handleImagePicker(3)}
										>
											<Text style={styles.buttonText}>Image 3</Text>
										</TouchableOpacity>
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
								{image4 !== '' ? (
									<>
										<View style={styles.showPicture}>
											<Image style={styles.showImage} source={{ uri: image4 }} />
											<TouchableOpacity onPress={() => setImage4('')}>
												<View
													style={{
														padding: 8,
														alignSelf: 'center',
														marginLeft: 40,
													}}
												>
													<Ionicons name="trash" size={32} color="#fb5b5a" />
												</View>
											</TouchableOpacity>
										</View>
									</>
								) : (
									<>
										<TouchableOpacity
											style={styles.buttonImagePicker}
											onPress={() => handleImagePicker(4)}
										>
											<Text style={styles.buttonText}>Image 4</Text>
										</TouchableOpacity>
									</>
								)}

								{!isValidim4 && <Text style={styles.errorText}>Please enter a valid url</Text>}
							</>
						) : (
							<></>
						)}
					</View>
					<RatingInput selectDone={selectDone} setRating={setRating} rating={rating} />
					<View style={styles.buttonContainer}>
						<Button title="Update Movie" onPress={handleUpdate} />
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
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
	showPicture: {
		display: 'flex',
		flexDirection: 'row',
		height: 200,
		width: 130,
		alignContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	showImage: {
		width: '100%',
		height: '100%',
	},
	buttonImagePicker: {
		backgroundColor: '#383838',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	radioContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: '#383838',
		padding: 10,
		borderRadius: 5,
		color: '#FFFFFF',
		marginBottom: 15,
	},
	radio: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonContainer: {
		// marginTop: 10,
	},
});

export default EditMovieAdmin;
