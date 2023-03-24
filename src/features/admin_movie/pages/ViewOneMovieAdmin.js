import { useRoute } from '@react-navigation/core';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ScrollView } from 'react-native-gesture-handler';

const ViewOneMovieAdmin = () => {
	const db = getFirestore();
	const store = getStorage();
	const route = useRoute();
	const { pid } = route.params;
	console.log(pid);

	const genres = [
		{ name: 'Action', color: '#FF5733' },
		{ name: 'Comedy', color: '#FFC300' },
		{ name: 'Drama', color: '#C70039' },
		{ name: 'Horror', color: '#610B21' },
		{ name: 'Science Fiction', color: '#138D75' },
		{ name: 'Romance', color: '#ff1100' },
		{ name: 'Thriller', color: '#8E44AD' },
		{ name: 'Animation', color: '#2ECC71' },
		{ name: 'Adventure', color: '#F1C40F' },
		{ name: 'Fantasy', color: '#3498DB' },
		{ name: 'Crime', color: '#273746' },
		{ name: 'Documentary', color: '#6C3483' },
		{ name: 'Musical', color: '#F1948A' },
		{ name: 'Mystery', color: '#1B2631' },
		{ name: 'War', color: '#BDC3C7' },
		{ name: 'Western', color: '#A04000' },
	];

	const [movieData, setMovieData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [wishList, setWishList] = useState(false);

	const fetchMovieData = async () => {
		try {
			setLoading(true);
			const movieRef = doc(db, 'AdminMovies', pid);
			const movieSnapshot = await getDoc(movieRef);
			if (movieSnapshot.exists()) {
				setMovieData(movieSnapshot.data());
			} else {
				console.log('Movie not found');
			}
			// setTimeout(() => {
			setLoading(false);
			// }, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMovieData();
	}, [db, pid]);

	const handleWishList = (id, wishList) => {
		setWishList(wishList);
		console.log(id);
		if (wishList) {
			Toast.show({
				type: 'success', // success, error, info
				text1: 'Added To WishList',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
				text2: 'You can see it in your profile',
			});
		}
		if (!wishList) {
			Toast.show({
				type: 'error', // success, error, info
				text1: 'Removed From WishList',
				topOffset: 100,
				visibilityTime: 1500, // if don't set this, it calls the default
				text2: 'You can see it in your profile',
			});
		}
	};
	const MAX_DESCRIPTION_LINES = 40;
	const [showFullDescription, setShowFullDescription] = useState(false);

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	const renderDescription = () => {
		if (movieData?.description) {
			const descriptionLines = movieData.description.split(' ');
			const showMoreButton = descriptionLines.length > MAX_DESCRIPTION_LINES;
			const truncatedDescription = descriptionLines.slice(0, MAX_DESCRIPTION_LINES).join(' ');
			const fullDescription = descriptionLines.join(' ');

			return (
				<View style={styles.container}>
					<Text
						style={{
							color: 'white',
							fontSize: 16,
							width: '100%',
							textAlign: 'justify',
						}}
						numberOfLines={showFullDescription ? undefined : MAX_DESCRIPTION_LINES}
					>
						{showFullDescription ? fullDescription : truncatedDescription}
					</Text>
					{showMoreButton && (
						<TouchableOpacity onPress={toggleDescription}>
							<Text
								style={{
									color: showFullDescription ? 'red' : 'green',
									fontSize: 16,
									textAlign: 'right',
								}}
							>
								{showFullDescription ? 'View less' : 'View more'}
							</Text>
						</TouchableOpacity>
					)}
				</View>
			);
		} else {
			return <Text style={{ color: 'white', fontSize: 16 }}>No description</Text>;
		}
	};
	return (
		<>
			{console.log(movieData)}
			{loading ? (
				<View style={styles.containerLoading}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text
						style={{
							color: '#fff',
							textAlign: 'center',
						}}
					>
						Loading...
					</Text>
				</View>
			) : (
				<View style={styles.container}>
					<ScrollView style={{ width: '100%' }}>
						<View style={styles.container}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
									padding: 10,
									backgroundColor: '#000',
									borderBottomLeftRadius: 10,
									borderBottomRightRadius: 10,
									borderBottomColor: '#fff',
									borderBottomWidth: 1,
									shadowColor: '#000',
								}}
							>
								<Image
									style={{
										width: 200,
										height: 300,
										borderRadius: 10,
										backgroundColor: '#000',
									}}
									source={{
										uri: movieData?.image1
											? movieData?.image1
											: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
									}}
								/>

								<TouchableOpacity
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute',
										right: 15,
										bottom: 20,
									}}
									onPress={() => handleWishList(movieData?.id, !wishList)}
								>
									<Ionicons
										style={{
											color: wishList ? 'red' : 'white',
										}}
										name="heart"
										size={40}
										color="black"
									/>
								</TouchableOpacity>
							</View>

							<View style={styles.rightContainer}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text
										style={{
											color: 'white',
											fontSize: 22,
											fontWeight: 'bold',
											fontFamily: 'sans-serif',
										}}
									>
										{movieData?.title
											? // first letter of title to uppercase and rest to lowercase every word
											  (movieData?.title).replace(/\w\S*/g, (w) =>
													w.replace(/^\w/, (c) => c.toUpperCase())
											  )
											: 'No Title'}
									</Text>
									<Text
										style={{
											color: 'white',
											backgroundColor: genres.find((genre) => genre.name === movieData?.genre)
												?.color,
											padding: 5,
											width: 100,
											borderRadius: 5,
											fontSize: 16,
											fontWeight: 'bold',
										}}
									>
										{movieData?.genre}
									</Text>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text
										style={{
											color: 'white',
											fontSize: 12,
										}}
									>
										{movieData?.year
											? `Release Date: ${movieData?.year}`
											: 'No Release Date : Still in Production'}
									</Text>
									<Text
										style={{
											color: 'white',
											fontSize: 12,
										}}
									>
										{movieData?.rate
											? (movieData?.rate == 1 && '⭐') ||
											  (movieData?.rate == 2 && '⭐⭐') ||
											  (movieData?.rate == 3 && '⭐⭐⭐') ||
											  (movieData?.rate == 4 && '⭐⭐⭐⭐') ||
											  (movieData?.rate == 5 && '⭐⭐⭐⭐⭐')
											: 'No Rating'}
									</Text>
								</View>
								<Text
									style={{
										color: 'white',
										fontSize: 12,
									}}
								>
									{movieData?.duration
										? Math.floor(movieData?.duration / 60) + 'h ' + (movieData?.duration % 60) + 'm'
										: 'No Duration'}
								</Text>

								{renderDescription()}

								{(movieData?.type == 2 || movieData?.type == 3) && (
									<ScrollView horizontal contentContainerStyle={{ paddingBottom: 10 }}>
										<Image
											style={styles.image}
											source={{
												uri: movieData?.image1
													? movieData?.image1
													: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
											}}
										/>
										{movieData?.image2 && (
											<Image
												style={styles.image}
												source={{
													uri: movieData?.image2
														? movieData?.image2
														: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
												}}
											/>
										)}
										{movieData?.image3 && (
											<Image
												style={styles.image}
												source={{
													uri: movieData?.image3
														? movieData?.image3
														: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
												}}
											/>
										)}
										{movieData?.type == 3 && movieData?.image4 && (
											<Image
												style={styles.image}
												source={{
													uri: movieData?.image4
														? movieData?.image4
														: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
												}}
											/>
										)}
									</ScrollView>
								)}
							</View>
						</View>
					</ScrollView>
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
	containerLoading: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
	rightContainer: {
		gap: 10,
		padding: 10,
	},
	image: {
		width: 200,
		height: 300,
		marginRight: 10,
		borderRadius: 10,
	},
});

export default ViewOneMovieAdmin;
