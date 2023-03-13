import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // import MaterialIcons from Expo vector icons

const userMovieCard = ({ id, title, watchDate, commentData, handleDelete, handleEdit }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.watchDate}>{watchDate}</Text>
            <Text style={styles.commentData}>{commentData}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleEdit(id)}>
                    <MaterialIcons name="edit" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(id)}>
                    <MaterialIcons name="delete" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    watchDate: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 4,
    },
    commentData: {
        fontSize: 16,
        color: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
    },
});

export default userMovieCard;
