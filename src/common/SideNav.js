import { useState } from 'react';
import { Image, Pressable, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SideBarDetails } from '../service/Data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

function SideNav({ navigation, ind, op }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<View>
				<Pressable
					onPress={() => {
						console.log('s');
						setIsOpen(true);
					}}
					style={ind ? styles.menuButton2 : styles.menuButton}
				>
					<Image source={require('../../assets/sidebar.png')} style={styles.sideButton} />
				</Pressable>
				{isOpen && (
					<View style={styles.sideBar}>
						<Pressable onPress={() => setIsOpen(false)}>
							<View>
								<Image source={require('../../assets/close.png')} style={styles.closeButton} />
							</View>
						</Pressable>
						{SideBarDetails.map((item, index) => {
							return (
								<Pressable
									key={index}
									onPress={() => navigation.navigate(item.screen)}
									style={styles.sideBarItems}
								>
									<Image source={item.image} style={styles.sideBarIcon} />
									<Text style={styles.sideBarText}>{item.title}</Text>
								</Pressable>
							);
						})}
						<Pressable
							onPress={() => navigation.navigate('Login')}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-start',
								marginTop: 'auto',
								marginBottom: '50%',
							}}
						>
							<AntDesign
								name="logout"
								size={24}
								color="black"
								style={{
									width: 30,
									height: 30,
									marginLeft: 50,
									marginTop: 14,
								}}
							/>
							<Text style={styles.sideBarText}>Log Out</Text>
						</Pressable>
					</View>
				)}
			</View>
		</>
	);
}

export default SideNav;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
	menuButton: {
		marginTop: 20,
		position: 'absolute',
		right: 140,
		zIndex: 1,
	},
	menuButton2: {
		marginTop: 0,
		position: 'absolute',
		right: 140,
		zIndex: 1,
	},
	sideButton: {
		width: 50,
		height: 50,
		marginLeft: 10,
		marginTop: 10,
	},
	sideBar: {
		position: 'absolute',
		right: -20,
		marginLeft: 10,
		// left: -170,
		zIndex: 10000,
		// width: 250,
		height: height,
		backgroundColor: '#82C7EE',
		borderTopRightRadius: 25,
		borderBottomRightRadius: 25,
	},
	closeButton: {
		width: 50,
		height: 50,
		marginLeft: 30,
		marginTop: 30,
	},
	sideBarText: {
		fontSize: 20,
		marginLeft: 20,
		marginTop: 14,
		marginRight: 20,
	},
	sideBarIcon: {
		width: 30,
		height: 30,
		marginLeft: 50,
		marginTop: 14,
	},
	sideBarItems: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 20,
	},
});
