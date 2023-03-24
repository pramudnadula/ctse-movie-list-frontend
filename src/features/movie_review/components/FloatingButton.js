import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const FloatingButton = ({ onPress }) => {
	const navigation = useNavigation();
	const [showMenu, setShowMenu] = useState(false);

	const handlePress = () => {
		setShowMenu(!showMenu);
	};

	const gotopage = (index) => {
		if (index === 1) {
			navigation.navigate('reviewadd');
			handlePress();
		} else if (index === 2) {
			navigation.navigate('myreview');
			handlePress();
		} else {
			navigation.navigate('Review');
			handlePress();
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handlePress}>
				<Ionicons name="add" size={24} color="white" />
			</TouchableOpacity>
			{showMenu && (
				<View style={styles.menu}>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {
							gotopage(1);
						}}
					>
						<Ionicons name="add-circle" size={24} color="#333" style={styles.menuIcon} />
						<Text style={styles.menuItemText}>Add Review</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {
							gotopage(2);
						}}
					>
						<Ionicons name="folder" size={24} color="#333" style={styles.menuIcon} />
						<Text style={styles.menuItemText}>My Reviews</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {
							gotopage(3);
						}}
					>
						<AntDesign name="profile" size={24} color="#333" style={styles.menuIcon} />
						<Text style={styles.menuItemText}>Reviews</Text>
					</TouchableOpacity>
				</View>
			)}
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
		color: '#fb5b5a',
	},
});

export default FloatingButton;
