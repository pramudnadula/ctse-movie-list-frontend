import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RatingInput({ selectDone, setRating, rating }) {
	// const [rating, setRating] = useState(0);

	const handlePress = (value) => {
		setRating(value);
		selectDone(value);
	};

	const stars = [1, 2, 3, 4, 5];

	return (
		<View style={[styles.container, styles.darkBackground]}>
			<Text style={[styles.title, styles.lightText]}>Rate this movie</Text>
			<View style={styles.buttonContainer}>
				{stars.map((value) => (
					<TouchableOpacity
						key={value}
						style={[styles.button, rating >= value && styles.activeButton]}
						onPress={() => handlePress(value)}
					>
						<Ionicons
							name="md-star"
							size={32}
							style={[styles.buttonText, rating >= value && styles.activeText]}
						/>
					</TouchableOpacity>
				))}
			</View>
			<Text style={[styles.rating, styles.lightText]}>{rating}/5</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: 50,
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	darkBackground: {
		backgroundColor: '#222',
	},
	lightText: {
		color: '#fff',
	},
	title: {
		fontSize: 20,
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 20,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 5,
	},
	activeButton: {
		backgroundColor: '#fb5b5a',
		borderColor: '#000',
	},
	buttonText: {
		fontSize: 18,
		color: '#000',
	},
	activeText: {
		color: '#FFD700',
	},
	rating: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});
