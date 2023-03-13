import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const AllMovies = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: 'My Awesome Movie', watchDate: 'March 10, 2023', commentData: 'This movie was great! Highly recommend.' },
        { id: 2, title: 'Another Great Movie', watchDate: 'March 11, 2023', commentData: 'Loved this movie too!' },
    ]);

    const handleDelete = (id) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    };

    const handleEdit = (id) => {
        // handle editing functionality
    };

    return (
        <View style={styles.container}>
            {movies.map((movie) => (
                <Card
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    watchDate={movie.watchDate}
                    commentData={movie.commentData}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AllMovies;