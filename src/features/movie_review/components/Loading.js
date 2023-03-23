import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#fb5b5a" />
		</View>
	);
};

export default Loading;
