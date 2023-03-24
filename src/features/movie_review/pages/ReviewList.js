import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { GET } from '../../../common/httphelper';
import Post from '../components/Post';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import SideNav from '../../../common/SideNav';
import Loading from '../components/Loading';
import FloatingButton from '../components/FloatingButton';

const ReviewList = () => {
	const navigation = useNavigation();
	const db = getFirestore();
	const store = getStorage();
	const [posts, setPosts] = useState([]);
	const [loading, setloading] = useState(false);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadData();
			console.log('Returning to earlier page');
		});

		return unsubscribe;
	}, [navigation]);

	const loadData = async () => {
		setloading(true);
		const reviewsRef = collection(db, 'review');
		const querySnapshot = await getDocs(reviewsRef);
		const reviews = [];
		querySnapshot.forEach((doc) => {
			const review = doc.data();
			review.id = doc.id;
			reviews.push(review);
		});
		setPosts(reviews);
		setloading(false);
	};
	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<>
					<FlatList
						data={posts}
						keyExtractor={(post) => post.id.toString()}
						renderItem={({ item }) => <Post post={item} />}
					/>
				</>
			)}
			<FloatingButton />
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
});
export default ReviewList;
