import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput } from 'react-native';
import { GET } from '../../../common/httphelper';
import Post from '../components/Post';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import SideNav from '../../../common/SideNav';
import Loading from '../components/Loading';
import FloatingButton from '../components/FloatingButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSliderModal from '../components/ImageSliderModal';
import VideoModal from '../components/VideoModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewList = () => {
	const navigation = useNavigation();
	const db = getFirestore();
	const store = getStorage();
	const [posts, setPosts] = useState([]);
	const [querys, setQuery] = useState('');
	const [loading, setloading] = useState(false);
	const [poster, setposter] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [images, setImages] = useState([]);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [vid, setvid] = useState('');

	const openModal = (postImages) => {
		setImages(postImages);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setImages([]);
	};
	const openModal2 = (vid) => {
		setvid(vid);
		setModalVisible2(true);
	};

	const closeModal2 = () => {
		setModalVisible2(false);
		setvid('');
	};
	const handleSearch = () => { };

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadData();
			console.log('Returning to earlier page');
		});

		return unsubscribe;
	}, [navigation]);

	const searchReviews = async (keyword) => {
		const firestore = getFirestore();
		setposter(false);
		const reviewsRef = collection(firestore, 'review');
		const q = query(reviewsRef, where('mname', '>=', keyword), where('mname', '<=', keyword + '\uf8ff'));
		const snapshot = await getDocs(q);
		const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		setPosts(reviews);
		if (reviews.length === 0) {
			setposter(true);
		}
	};

	const loadData = async () => {
		console.log(await AsyncStorage.getItem('isAdmin'))
		setloading(true);
		setposter(false);
		const reviewsRef = collection(db, 'review');
		const querySnapshot = await getDocs(reviewsRef);
		const reviews = [];
		querySnapshot.forEach((doc) => {
			const review = doc.data();
			review.id = doc.id;
			reviews.push(review);
		});
		setPosts(reviews);
		if (reviews.length === 0) {
			setposter(true);
		}
		setloading(false);
	};
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.sinput}
				placeholder="Search for a Post..."
				placeholderTextColor="#ccc"
				// value={query}
				onChangeText={(text) => searchReviews(text)}
				onSubmitEditing={handleSearch}
			/>
			{poster && posts.length == 0 ? (
				<Text Text style={styles.banner}>
					No reviews found.
				</Text>
			) : (
				''
			)}
			{loading ? (
				<Loading />
			) : (
				<>
					<FlatList
						data={posts}
						keyExtractor={(post) => post.id.toString()}
						renderItem={({ item }) => <Post post={item} openModal={openModal} openModal2={openModal2} />}
					/>
				</>
			)}
			<FloatingButton />
			<ImageSliderModal visible={modalVisible} onClose={closeModal} images={images} />
			<VideoModal visible={modalVisible2} onClose={closeModal2} vid={vid} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#222',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
	sinput: {
		backgroundColor: '#555',
		borderRadius: 8,
		margin: 20,
		color: '#fff',
		fontSize: 16,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	banner: {
		color: 'grey',
		paddingVertical: 8,
		paddingHorizontal: 16,
		alignSelf: 'center',
		marginBottom: 16,
		fontSize: 20,
	},
});
export default ReviewList;
