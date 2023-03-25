import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('login');
		}, 3000); // change this to the desired length of time for your splash screen
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.container1}>
				<Image source={require('./logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
		</View>
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
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	logo: {
		height: '50%',
		width: '50%',
	},
});

export default SplashScreen;
