import { StyleSheet, View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const OneMovie = ({ movie }) => {
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

	const [wishList, setWishList] = useState(false);

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
	const navigation = useNavigation();
	const gotoviewpage = (id) => {
		navigation.navigate('viewOneMovie', { mid: id });
	};

	return (
		<TouchableOpacity onPress={() => gotoviewpage(movie?.id)}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image
						style={styles.image}
						source={{
							uri: movie?.image1
								? movie?.image1
								: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
						}}
					/>
				</View>

				<View style={styles.rightContainer}>
					<Text
						style={{
							color: 'white',
							fontSize: 22,
							fontWeight: 'bold',
							fontFamily: 'sans-serif',
						}}
					>
						{movie?.title
							? // first letter of title to uppercase and rest to lowercase every word
							  (movie?.title).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
							: 'No Title'}
					</Text>
					<Text
						style={{
							color: 'white',
							backgroundColor: genres.find((genre) => genre.name === movie?.genre)?.color,
							padding: 5,
							width: 100,
							borderRadius: 5,
							fontSize: 16,
							fontWeight: 'bold',
						}}
					>
						{movie?.genre}
					</Text>
					<Text
						style={{
							color: 'white',
							fontSize: 16,
							height: 24,
							width: '100%',
						}}
					>
						{movie?.description ? movie?.description : 'No Description'}
					</Text>
					<Text
						style={{
							color: 'white',
							fontSize: 12,
						}}
					>
						{movie?.year ? `Release Date: ${movie?.year}` : 'No Release Date : Still in Production'}
					</Text>
					<Text
						style={{
							color: 'white',
							fontSize: 12,
						}}
					>
						{movie?.rate
							? (movie?.rate == 1 && '⭐') ||
							  (movie?.rate == 2 && '⭐⭐') ||
							  (movie?.rate == 3 && '⭐⭐⭐') ||
							  (movie?.rate == 4 && '⭐⭐⭐⭐') ||
							  (movie?.rate == 5 && '⭐⭐⭐⭐⭐')
							: 'No Rating'}
					</Text>
					<Text
						style={{
							color: 'white',
							fontSize: 12,
						}}
					>
						{movie?.duration
							? Math.floor(movie?.duration / 60) + 'h ' + (movie?.duration % 60) + 'm'
							: 'No Duration'}
					</Text>

					<TouchableOpacity
						style={{
							backgroundColor: wishList ? 'red' : 'black',
							width: 40,
							height: 50,
							padding: 4.5,
							borderTopEndRadius: 10,
							borderTopStartRadius: 10,
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							right: 0,
							bottom: 0,
						}}
						onPress={() => handleWishList(movie?.id, !wishList)}
					>
						<Ionicons
							style={{
								color: 'white',
							}}
							name="heart"
							size={32}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginVertical: 10,
		marginHorizontal: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#000',
	},
	leftContainer: {
		flex: 4,
	},
	rightContainer: {
		flex: 7,
		gap: 10,
		paddingLeft: 10,
	},
	image: {
		borderRadius: 5,
		width: '100%',
		height: 200,
	},
});

export default OneMovie;
