import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Image, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	doc,
	addDoc,
	serverTimestamp,
	where,
	runTransaction,
	query,
	orderBy,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore';
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
import { add } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const EditList = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { pid, did } = route.params;
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [umid, setumid] = useState('');
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [isEnabled2, setisEnabled2] = useState('');
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
	const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [loading, setloading] = useState(false);
	const [added, setadded] = useState(false);
	const [mov, setmov] = useState({});
	const db = getFirestore();
	useEffect(() => {
		loaddata();
	}, [pid]);
	const loaddata = async () => {
		const docRef = doc(collection(db, `userMovie/${did}/list`), pid);
		getDoc(docRef).then((data) => {
			setmov(data.data());
			setisEnabled2(data.data().watched);
			setDate(data.data().date);
			setRating(data.data().rating);
			setComment(data.data().comment);
		});
	};

	const submit = async () => {
		const db = getFirestore();

		const ob = {
			watched: isEnabled2,
			rating,
			comment,
		};
		const docRef = doc(collection(db, `userMovie/${did}/list`), pid);
		updateDoc(docRef, ob);
		Toast.show({
			type: 'success',
			text1: ' List Updated Successfully',
			topOffset: 100,
			visibilityTime: 1500,
		});
		navigation.navigate('My Movie');
	};

	const onDateChange = (date) => {
		console.log('s');
		setSelectedDate(date);
	};
	const toggleSwitch2 = () => {
		setisEnabled2(!isEnabled2);
	};
	const handleDateConfirm = (date) => {
		setDate(date.toISOString().slice(0, 10));
		setIsDatePickerVisible(false);
	};

	const handleTimeConfirm = (time) => {
		setTime(time.toLocaleTimeString());
		setIsTimePickerVisible(false);
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<View style={styles.form}>
					<OneSwitch></OneSwitch>
					<Text style={styles.title}>{mov.mname}</Text>
					<Image style={styles.showim} source={{ uri: mov.img }} />

					<Text style={styles.label}>Watched the movie</Text>
					<OneSwitch>
						<Switch
							trackColor={{ false: '#767577', true: '#fb5b5a' }}
							thumbColor={isEnabled2 ? '#fb5b5a' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch2}
							value={isEnabled2}
						/>
					</OneSwitch>
					{/* <Text style={styles.label}>Date You watched</Text> */}
					{/* <DateField
                        labelDate="Date"
                        labelMonth="Month"
                        labelYear="Year"
                        styleInput={{ fontSize: 15, margin: 8 }}
                        containerStyle={{ marginVertical: 20, backgroundColor: 'white', padding: 10, borderRadius: 8 }}
                        onSubmit={(value) => setDate(value)}
                    /> */}

					<Text style={styles.label}>Rate the Movie</Text>
					<StarRating
						disabled={false}
						maxStars={5}
						rating={rating}
						selectedStar={(rating) => setRating(rating)}
						fullStarColor="#fb5b5a"
						starSize={40}
						containerStyle={{ marginVertical: 20 }}
					/>
					<TextInput
						style={{
							color: '#fff',
							fontSize: 24,
							borderWidth: 1,
							borderColor: '#fb5b5a',
							padding: 10,
							borderRadius: 10,
							width: '80%',
						}}
						placeholder="Enter comment"
						placeholderTextColor="#777"
						multiline={true}
						numberOfLines={4}
						value={comment}
						onChangeText={(comment) => setComment(comment)}
					/>
					<TouchableOpacity
						style={{
							backgroundColor: '#fb5b5a',
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 10,
							marginTop: 20,
						}}
						onPress={() => submit()}
					>
						<Text style={{ color: 'white', fontSize: 18, alignSelf: 'center' }}>update</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
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
	showim: {
		width: '100%',
		height: 380,
		marginBottom: 20,
		marginTop: 20,
	},
	title: {
		fontSize: 25,
		color: '#fff',
		alignSelf: 'center',
		color: '#fb5b5a',
	},
	container: {
		flex: 1,
		backgroundColor: '#121212',
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollContainer: {},
});

export default EditList;
