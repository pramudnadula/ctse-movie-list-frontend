import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
const ImageSliderModal = ({ visible, onClose, images }) => {
    const renderImage = ({ item }) => {
        return <Image source={{ uri: item }} style={styles.image} />;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <Carousel
                    data={images}
                    renderItem={renderImage}
                    sliderWidth={300}
                    itemWidth={300}
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={32} color="#fb5b5a" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 300,
        height: 300,
        marginTop: 220,
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 200,
        left: 320,
        borderRadius: 20,
    },
    closeButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ImageSliderModal;
