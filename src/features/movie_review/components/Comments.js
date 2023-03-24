import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Comments = ({ avatarUrl, com }) => {
	return (
		<View style={styles.comment}>
			<Image style={styles.avatar} source={{ uri: com.pic }} />
			<View style={styles.commentContent}>
				<Text style={styles.commentUsername}>{com.uname}</Text>
				<Text style={styles.commentText}>{com.text}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	comment: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 25,
		marginRight: 10,
	},
	commentContent: {
		flex: 1,
	},
	commentUsername: {
		fontWeight: 'bold',
		fontSize: 14,
		color: '#fff',
	},
	commentText: {
		fontSize: 13,
		color: '#fff',
	},
});

export default Comments;
