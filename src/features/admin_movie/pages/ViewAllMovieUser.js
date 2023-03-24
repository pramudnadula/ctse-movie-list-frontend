import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput } from 'react-native';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneMovieUser from '../components/OneMovieUser';

const ViewAllMovieUser = () => {
	const navigation = useNavigation();
	const db = getFirestore();
	const store = getStorage();
	const [movies, setMovies] = useState([]);
	//   const [searchTitle, setSearchTitle] = useState("");
	//   const [searchDescription, setSearchDescription] = useState("");
	const [searchQuery, setSearchQuery] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const loadData = async () => {
		let adminMovieRef = collection(db, 'AdminMovies');
		console.log(searchQuery);

		setIsAdmin((await AsyncStorage.getItem('isAdmin')) === 'true');
		if (searchQuery !== '') {
			const searchRef = query(adminMovieRef, where('title', '>=', String(searchQuery).toLowerCase()));
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
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadData();
			console.log('Returning to earlier page');
		});

		return unsubscribe;
	}, [searchQuery, db, navigation]);

	const handleSearch = (text) => {
		setSearchQuery(text);
	};
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.searchBar}
				placeholder="Search by title or description"
				placeholderTextColor="#fff"
				onChangeText={handleSearch}
				value={searchQuery}
			/>
			<FlatList
				data={movies}
				keyExtractor={(movie) => movie.id.toString()}
				renderItem={({ item }) => <OneMovieUser movie={item} />}
			/>
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
	searchBar: {
		backgroundColor: '#333',
		color: '#fff',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
});
export default ViewAllMovieUser;
