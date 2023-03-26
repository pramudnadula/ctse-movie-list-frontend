import { Ionicons } from '@expo/vector-icons';
import { deleteUser, getAuth } from '@firebase/auth';
import { collection, deleteDoc, doc, getFirestore } from '@firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Details, MainRow, Row, UserImage, UserInfo, UserInfoText, UserName } from '../styles/UserCard.style';
import PopupModal from './PopupModal';

const style = StyleSheet.create({
	modalView: {
		display: 'flex',
		marginHorizontal: 20,
		marginVertical: 10,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

function UserCard({ user, handleFetchUsers }) {
	const database = getFirestore();

	const [modalVisible, setModalVisible] = useState(false);

	const handleRemoveUser = async () => {
		try {
			const docRef = doc(collection(database, 'users'), user.id);
			await deleteDoc(docRef);
			// await deleteUser(user.id);
			console.log('Document successfully deleted!');
			Toast.show({
				type: 'success', // success, error, info
				text1: 'Successfully removed User.',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});
			setModalVisible(false);
			handleFetchUsers();
		} catch (err) {
			console.log(err.code);
			setModalVisible(false);
			Toast.show({
				type: 'error', // success, error, info
				text1: 'Something went wrong. User not Removed.',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
			});
		}
	};

	return (
		<>
			<View style={style.modalView}>
				<MainRow>
					<UserInfo>
						<UserImage
							source={{
								uri: user?.photo
									? user?.photo
									: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
							}}
						/>
						<UserInfoText>
							<UserName>
								{user?.name
									? (user?.name).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
									: 'NO NAME'}
							</UserName>
						</UserInfoText>
					</UserInfo>
					<View>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(true);
							}}
						>
							<Ionicons name="trash-outline" size={24} color="red" />
						</TouchableOpacity>
					</View>
				</MainRow>
				<Row>
					<Details>
						User-Type :{' '}
						{user?.isAdmin ? (
							<Text style={{ color: 'red', fontWeight: 'bold' }}>ADMIN</Text>
						) : (
							<Text style={{ color: 'green', fontWeight: 'bold' }}>USER</Text>
						)}
					</Details>
					<Details>
						Name :{' '}
						<Text style={{ fontWeight: 'bold' }}>
							{user?.name
								? (user?.name).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
								: 'Not Provided'}
						</Text>
					</Details>
					<Details>
						Email :{' '}
						<Text style={{ fontWeight: 'bold' }}>
							{user?.email ? user?.email?.toLowerCase() : 'Not Provided'}
						</Text>
					</Details>
					<Details>
						Country :{' '}
						<Text style={{ fontWeight: 'bold' }}>
							{user?.country
								? (user?.country).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
								: 'Not Provided'}
						</Text>
					</Details>
				</Row>
			</View>
			<PopupModal
				handleRemoveUser={handleRemoveUser}
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}
			/>
		</>
	);
}

export default UserCard;
