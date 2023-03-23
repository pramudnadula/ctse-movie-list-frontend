import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function RatingInput({ selectedone, view, def }) {

    const [rating, setRating] = useState(def !== '' ? def : 0);

    const handlePress = (value) => {
        setRating(value);
        selectedone(value);
    };

    return (
        <View style={[styles.container, styles.darkBackground]}>
            <Text style={[styles.title, styles.lightText]}>{view ? 'Rating for Movie' : 'Rate this movie'}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, rating >= 1 && styles.activeButton]}
                    onPress={() => handlePress(1)}
                >
                    <Text style={[styles.buttonText, rating >= 1 && styles.activeText]}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, rating >= 2 && styles.activeButton]}
                    onPress={() => handlePress(2)}
                >
                    <Text style={[styles.buttonText, rating >= 2 && styles.activeText]}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, rating >= 3 && styles.activeButton]}
                    onPress={() => handlePress(3)}
                >
                    <Text style={[styles.buttonText, rating >= 3 && styles.activeText]}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, rating >= 4 && styles.activeButton]}
                    onPress={() => handlePress(4)}
                >
                    <Text style={[styles.buttonText, rating >= 4 && styles.activeText]}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, rating >= 5 && styles.activeButton]}
                    onPress={() => handlePress(5)}
                >
                    <Text style={[styles.buttonText, rating >= 5 && styles.activeText]}>5</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.rating, styles.lightText]}>{rating}/5</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    darkBackground: {
        backgroundColor: '#222',
    },
    lightText: {
        color: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#fb5b5a',
        borderColor: '#000',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
    activeText: {
        color: '#fff',
    },
    rating: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
