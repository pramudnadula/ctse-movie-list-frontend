import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import OneMovie from '../components/OneMovie';
import FloatingButton from '../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ViewAllMoviesAdmin = () => {
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
	const navigation = useNavigation();
	const db = getFirestore();
	const store = getStorage();
	const [movies, setMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [genre, setGenre] = useState('');
	const [loading, setLoading] = useState(true);

	const loadData = async () => {
		setLoading(true);
		let adminMovieRef = collection(db, 'AdminMovies');
		console.log(searchQuery);

		setIsAdmin((await AsyncStorage.getItem('isAdmin')) === 'true');
		if (searchQuery !== '') {
			const searchRef = query(adminMovieRef, where('title', '>=', String(searchQuery).toLowerCase()));
			adminMovieRef = searchRef;
		}

		if (genre !== '') {
			const searchRef = query(adminMovieRef, where('genre', '==', String(genre)));
			adminMovieRef = searchRef;
		}

		const querySnapshot = await getDocs(adminMovieRef);
		const movies = [];
		querySnapshot.forEach((doc) => {
			const movie = doc.data();
			movie.id = doc.id;
			movies.push(movie);
		});
		setMovies(movies);
		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, [searchQuery, db, genre]);

	useEffect(() => {
		loadData();
		// const unsubscribe = navigation.addListener('focus', () => {
		// 	console.log('Returning to earlier page');
		// });

		// return unsubscribe;
	}, [navigation]);

	const handleSearch = (text) => {
		setSearchQuery(text);
	};
	return (
		<>
			{loading ? (
				<View style={styles.containerLoading}>
					<ActivityIndicator size="large" color="#fb5b5a" />
					<Text
						style={{
							color: '#fb5b5a',
							textAlign: 'center',
						}}
					>
						Loading...
					</Text>
				</View>
			) : (
				<View style={styles.container}>
					<TextInput
						style={styles.searchBar}
						placeholder="Search by title"
						placeholderTextColor="#fff"
						onChangeText={handleSearch}
						value={searchQuery}
					/>
					<Picker
						selectedValue={genre}
						style={styles.searchBar}
						placeholder="Genre"
						placeholderTextColor="#B3B3B3"
						onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
					>
						<Picker.Item label="Filter by Genre" value="" />
						{genres.map((item, index) => {
							return <Picker.Item label={item} value={item} key={index} />;
						})}
					</Picker>
					<FlatList
						data={movies}
						keyExtractor={(movie) => movie.id.toString()}
						renderItem={({ item }) => <OneMovie movie={item} isAdmin={isAdmin} />}
					/>
					{isAdmin && <FloatingButton />}
				</View>
			)}
		</>
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
	searchBar: {
		backgroundColor: '#555',
		borderRadius: 8,
		margin: 5,
		color: '#fff',
		fontSize: 16,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	containerLoading: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
});
export default ViewAllMoviesAdmin;
