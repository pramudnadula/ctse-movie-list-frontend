import { useRoute } from '@react-navigation/core';
import { StyleSheet, Text, View } from 'react-native';

const ViewOneMovieAdmin = () => {
	const route = useRoute();
	const { pid } = route.params;
	console.log(pid);

	// react native hooks
	return (
		<View style={styles.container}>
			<Text>ViewOneMovieAdmin</Text>
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
});

export default ViewOneMovieAdmin;
