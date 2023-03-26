import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Details, ImageContainer, UserImage, UserDetailsContainer } from '../../styles/UserDetails.style';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import EditFloatingButton from '../../components/EditFloatingButton';
import Loading from '../../../movie_review/components/Loading';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#222',
		height: '100%',
		width: '100%',
	},
	username: {
		color: '#fff',
		fontSize: 24,
		backgroundColor: 'green',
		paddingVertical: 5,
		paddingHorizontal: 20,
		borderRadius: 10,
	},
});

function UserDetails() {
	const auth = getAuth();
	const database = getFirestore();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const handleGetUserDetails = async () => {
		try {
			setIsLoading(true);
			const docRef = doc(database, 'users', auth.currentUser.uid);
			const result = await getDoc(docRef);
			setUser(result.data());
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleGetSummary = async () => {
		try {
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleGetUserDetails();
	}, []);

	return (
		<ScrollView contentContainerStyle={style.container}>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<ImageContainer>
						<UserImage
							source={{
								uri: user?.photo
									? user?.photo
									: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
							}}
						/>
						<Text style={style.username}>
							{user?.name
								? (user?.name).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
								: 'Not Provided'}
						</Text>
					</ImageContainer>
					<UserDetailsContainer>
						<Details>Email : {user?.email ? user?.email?.toLowerCase() : 'Not Provided'}</Details>
						<Details>
							Country :{' '}
							{user?.country
								? (user?.country).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
								: 'Not Provided'}
						</Details>
						<Details>Gender : {user?.gender?.toUpperCase()}</Details>
					</UserDetailsContainer>
					<EditFloatingButton
						onPress={() => {
							handleRelocate();
						}}
					/>
				</>
			)}
		</ScrollView>
	);
}

export default UserDetails;
