import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput } from 'react-native';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import OneMovie from '../components/OneMovie';
import FloatingButton from '../components/FloatingButton';

const ViewAllMoviesAdmin = () => {
	const db = getFirestore();
	const store = getStorage();
	const [posts, setPosts] = useState([]);
	//   const [searchTitle, setSearchTitle] = useState("");
	//   const [searchDescription, setSearchDescription] = useState("");
	const [searchQuery, setSearchQuery] = useState('');

	const loadData = async () => {
		let adminMovieRef = collection(db, 'AdminMovies');
		console.log(searchQuery);

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
		setPosts(movies);
	};

	useEffect(() => {
		loadData();
	}, [searchQuery]);

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
				data={posts}
				keyExtractor={(post) => post.id.toString()}
				renderItem={({ item }) => <OneMovie post={item} />}
			/>
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
	searchBar: {
		backgroundColor: '#333',
		color: '#fff',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
});
export default ViewAllMoviesAdmin;
