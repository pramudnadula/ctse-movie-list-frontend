import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ViewAllMoviesAdmin from './ViewAllMoviesAdmin';
import ViewAllMovieUser from './ViewAllMovieUser';

function Movies() {
	const [isAdmin, setIsAdmin] = useState(true);

	const handleSetAdmin = async () => {
		try {
			const admin = (await AsyncStorage.getItem('isAdmin')) === 'true';
			setIsAdmin(admin);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		handleSetAdmin();
	}, []);
	return <>{isAdmin ? <ViewAllMoviesAdmin /> : <ViewAllMovieUser />}</>;
}

export default Movies;
