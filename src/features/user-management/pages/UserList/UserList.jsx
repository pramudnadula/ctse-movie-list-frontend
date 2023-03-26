import { collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, ViewBase } from 'react-native';
import Loading from '../../../movie_review/components/Loading';
import FloatingButton from '../../components/FloatingButton';
import UserCard from '../../components/UserCard';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#222',
		height: '100%',
		width: '100%',
	},
	search: {
		backgroundColor: '#555',
		borderRadius: 8,
		margin: 20,
		color: '#fff',
		fontSize: 16,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
});

function UserList() {
	const database = getFirestore();
	const navigation = useNavigation();

	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleFetchUsers = async () => {
		try {
			setIsLoading(true);
			const usersRef = collection(database, 'users');
			const querySnapshot = await getDocs(usersRef);
			const userArr = [];
			querySnapshot.forEach((doc) => {
				const user = doc.data();
				user.id = doc.id;
				userArr.push(user);
			});
			setUsers(userArr);
			setIsLoading(false);
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

	const handleSearchUser = async (text) => {
		try {
			const userRef = collection(database, 'users');
			const searchQuery = query(userRef, where('name', '>=', text), where('name', '<=', text + '\uf8ff'));
			const snapshot = await getDocs(searchQuery);
			const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			if (users.length === 0) {
				setUsers([]);
			} else {
				setUsers(users);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			handleFetchUsers();
			console.log('Returning to earlier page');
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<View style={style.container}>
			{isLoading ? (
				<Loading />
			) : (
				<View>
					<TextInput
						style={style.search}
						placeholder="Search for a User..."
						placeholderTextColor="#ccc"
						onChangeText={(text) => {
							handleSearchUser(text);
						}}
					/>
					<FlatList
						data={users}
						keyExtractor={(post) => post.id.toString()}
						renderItem={({ item }) => <UserCard user={item} handleFetchUsers={handleFetchUsers} />}
					/>
				</View>
			)}
			<FloatingButton />
		</View>
	);
}

export default UserList;
