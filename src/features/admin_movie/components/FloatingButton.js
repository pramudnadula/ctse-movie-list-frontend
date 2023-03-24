import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FloatingButton = () => {
	const navigation = useNavigation();

	const goToPage = (index) => {
		if (index === 1) {
			navigation.navigate('Admin Add Movie');
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					goToPage(1);
				}}
			>
				<MaterialCommunityIcons name="movie-open-plus" size={24} style={styles.menuIcon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 20,
		right: 20,
	},
	button: {
		backgroundColor: '#fb5b5a',
		borderRadius: 30,
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	menu: {
		position: 'absolute',
		bottom: 60,
		right: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 5,
		width: 150,
	},
	menuItem: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		width: 160,
	},
	menuItemText: {
		fontSize: 16,
	},
	menuIcon: {
		marginRight: 10,
		color: '#fff',
	},
});

export default FloatingButton;
