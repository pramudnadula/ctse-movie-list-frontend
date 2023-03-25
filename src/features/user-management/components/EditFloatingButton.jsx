import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditFloatingButton = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('edit-user');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleNavigate();
        }}
      >
        <MaterialCommunityIcons name="account-edit" size={24} style={styles.menuIcon} />
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
  menuIcon: {
    color: '#fff',
  },
});

export default EditFloatingButton;
