import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Sidebar = ({ toggleDrawer }) => {
    const menuItems = [
        { id: 1, icon: 'home', label: 'Home', screen: 'Home' },
        { id: 2, icon: 'person', label: 'Profile', screen: 'Profile' },
        { id: 3, icon: 'settings', label: 'Settings', screen: 'Settings' },
        { id: 4, icon: 'log-out', label: 'Logout', screen: 'Logout' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>My App</Text>
                <TouchableOpacity style={styles.menuButton} onPress={() => toggleDrawer()}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.menuItem}>
                        <Ionicons name={item.icon} size={24} color="white" />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    logo: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    menuButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 8,
        borderRadius: 8,
    },
    menu: {
        padding: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    menuLabel: {
        color: 'white',
        fontSize: 16,
        marginLeft: 16,
    },
});

export default Sidebar;
