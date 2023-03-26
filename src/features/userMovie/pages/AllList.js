import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default AllList = () => {
	const navigation = useNavigation();
	const [movies, setMovies] = useState([]);
	const [docid, setdocid] = useState('');
	const [delid, setdelid] = useState('');

	const [modalVisible, setModalVisible] = useState(false);
	useEffect(() => {
		// const unsubscribe = navigation.addListener('focus', () => {
		loadData();
		create();
		// console.log('Returning to earlier page');
		// });

		// return unsubscribe;
	}, [navigation]);

	const create = async () => {
		const db = getFirestore();
		const movieRef = collection(db, 'userMovie');
		const querySnapshot = await getDocs(query(movieRef, where('uid', '==', getAuth().currentUser.uid)));
		if (querySnapshot.empty) {
			addDoc(movieRef, { uid: getAuth().currentUser.uid });
		}
	};
	const handleDeletes = (id) => {
		setModalVisible(true);
		setdelid(id);
	};
	const handleDelete = async () => {
		const db = getFirestore();
		const docRef = doc(collection(db, `userMovie/${docid}/list`), delid);
		await deleteDoc(docRef);
		setModalVisible(false);
		loadData();
	};
	const handleEdit = (id) => {
		console.log(docid);
		navigation.navigate('ledit', { pid: id, did: docid });
	};
	const loadData = async () => {
		let firstDoc = {};
		const db = getFirestore();
		const userId = getAuth().currentUser.uid;
		const movieRef = collection(db, 'userMovie');
		const querySnapshot = await getDocs(query(movieRef, where('uid', '==', userId)));
		if (!querySnapshot.empty) {
			firstDoc = querySnapshot.docs[0].data;
			firstDoc.id = querySnapshot.docs[0].id;
			setdocid(firstDoc.id);
		}
		//console.log(firstDoc.id)

		const querySnapshots = await getDocs(collection(db, `userMovie/${firstDoc.id}/list`));
		console.log(querySnapshots);
		let movs = [];
		querySnapshots.forEach((snap) => {
			console.log(snap.data());
			let ir = snap.data();
			ir.id = snap.id;
			console.log(snap.id);
			if (ir.date !== '') {
				const jsDate = ir.date?.toDate();
				ir.date = jsDate?.toLocaleDateString();
			}

			movs.push(ir);
		});
		console.log('dee');
		setMovies(movs);
	};

	const renderItems = ({ item }) => (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 10,
				flex: 1,
				marginVertical: 10,
				marginHorizontal: 10,
				padding: 2,
				borderRadius: 10,
				backgroundColor: '#fff',
			}}
		>
			<View style={styles.movie}>
				<Image
					style={styles.movieImage}
					source={{
						uri: item?.img
							? item?.img
							: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
					}}
				/>
				<View style={styles.movieDetails}>
					<Text style={styles.movieTitle}>
						{item?.mname
							? (item?.mname).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
							: 'No Title'}
					</Text>

					<Text style={styles.movieDate}>{item?.date ? item?.date : 'No Date'}</Text>
					<Text style={styles.movieComment}>{item?.comment ? item?.comment : 'No Comment'}</Text>

					{item?.watched ? (
						<View style={styles.watchedTag}>
							<Text style={styles.tagText}>Watched</Text>
						</View>
					) : (
						<View style={styles.notWatchedTag}>
							<Text style={styles.tagText}>Not Watched</Text>
						</View>
					)}
				</View>
				<TouchableOpacity onPress={() => handleEdit(item?.id)} style={{ marginRight: 8 }}>
					<Ionicons name="pencil-outline" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleDeletes(item?.id)}>
					<Ionicons name="trash-outline" size={24} color="#fb5b5a" />
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList data={movies} keyExtractor={(post) => post.id} renderItem={renderItems} />

			<Modal
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
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
		</View>
	);
};

const styles = StyleSheet.create({
	movie: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: '#1e1e1e',
		borderBottomWidth: 1,
		borderRadius: 10,
		borderBottomColor: '#383838',
		gap: 5,
	},
	movieImage: {
		width: 70,
		height: 95,
		marginRight: 10,
		borderRadius: 5,
	},
	movieDetails: {
		flex: 1,
	},
	movieTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 5,
	},
	movieDate: {
		fontSize: 14,
		color: '#aaa',
	},
	movieComment: {
		fontSize: 16,
		color: '#fff',
		marginBottom: 5,
	},

	container: {
		flex: 1,
		backgroundColor: '#121212',
		paddingHorizontal: 10,
	},
	watchedTag: {
		backgroundColor: '#5cb85c',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		width: 90,
	},
	notWatchedTag: {
		backgroundColor: '#d9534f',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		width: 90,
	},
	tagText: {
		color: '#fff',
		fontSize: 12,
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
});
