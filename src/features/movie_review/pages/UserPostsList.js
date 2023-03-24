import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { FlatList, View, Text, StyleSheet, TouchableOpacity, Modal, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import FloatingButton from '../components/FloatingButton';

const UserPostsList = () => {
	const navigation = useNavigation();
	const db = getFirestore();

	const [posts, setPosts] = useState([]);
	const [loading, setloading] = useState(false);
	const [delid, setdelid] = useState('');

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadData();
		});

		return unsubscribe;
	}, [navigation]);

	const loadData = async () => {
		setloading(true);
		const reviewsRef = collection(db, 'review');
		const querySnapshot = await getDocs(query(reviewsRef, where('uid', '==', 'xX4OtaV4j5fLIE1k2cL7l4igkeN2')));
		const reviews = [];
		querySnapshot.forEach((doc) => {
			const review = doc.data();
			review.id = doc.id;
			reviews.push(review);
		});
		setPosts(reviews);
		setloading(false);
	};
	const [selectedPost, setSelectedPost] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const EditButton = (id) => {
		navigation.navigate('edit', { pid: id });
	};

	const handleDelete = () => {
		const db = getFirestore();
		const docRef = doc(collection(db, 'review'), delid);
		deleteDoc(docRef)
			.then(() => {
				console.log('Document successfully deleted!');
				setModalVisible(false);
				loadData();
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<View style={styles.con1}>
				<Image style={styles.im} source={{ uri: item.img1 }} />
			</View>

			<View style={styles.con2}>
				<Text style={styles.title}>{item.mname}</Text>
				<Text style={{ color: 'white' }}>{item.title}</Text>
				<View style={styles.iconContainer}>
					<TouchableOpacity onPress={() => EditButton(item.id)} style={styles.iconButton}>
						<Ionicons name="pencil-outline" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setdelid(item.id);
							setSelectedPost(item);
							setModalVisible(true);
						}}
						style={styles.iconButton}
					>
						<Ionicons name="trash-outline" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<>
					<FlatList data={posts} renderItem={renderItem} keyExtractor={(item) => item.id} />
				</>
			)}

			<Modal
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
					setSelectedPost(null);
				}}
			>
				<View style={styles.modal}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>Are you sure you want to delete this post?</Text>
						<View style={styles.modalButtonsContainer}>
							<Pressable
								style={[styles.modalButton, styles.modalButtonCancel]}
								onPress={() => {
									setModalVisible(false);
									setSelectedPost(null);
								}}
							>
								<Text style={styles.modalButtonText}>Cancel</Text>
							</Pressable>
							<Pressable style={[styles.modalButton, styles.modalButtonDelete]} onPress={handleDelete}>
								<Text style={styles.modalButtonText}>Delete</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
			<FloatingButton />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
		paddingHorizontal: 10,
	},
	container2: {
		backgroundColor: '#121212',
		height: 700,
	},
	item: {
		backgroundColor: '#212121',
		borderRadius: 5,
		padding: 10,
		marginVertical: 5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#fb5b5a',
		marginBottom: 5,
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 5,
	},
	iconButton: {
		marginLeft: 10,
	},
	modal: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#222',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
	},
	modalText: {
		fontSize: 18,
		color: 'white',
		marginBottom: 20,
		textAlign: 'center',
	},
	modalButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	modalButton: {
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	modalButtonCancel: {
		backgroundColor: '#ccc',
		marginRight: 170,
	},
	modalButtonDelete: {
		backgroundColor: '#fb5b5a',
	},
	modalButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	im: {
		width: 50,
		height: 70,
	},
	con1: {},
});

export default UserPostsList;
