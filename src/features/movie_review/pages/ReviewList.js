import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import Post from '../components/Post';

const posts = [
    {
        id: 1,
        username: 'johndoe',
        imageUrl: 'https://picsum.photos/id/1/200/300',
        caption: 'This is a post!',
        likes: 12,
    },
    {
        id: 2,
        username: 'janedoe',
        imageUrl: 'https://picsum.photos/id/2/200/300',
        caption: 'Another post!',
        likes: 20,
    },
    {
        id: 3,
        username: 'bobsmith',
        imageUrl: 'https://picsum.photos/id/3/200/300',
        caption: 'A third post!',
        likes: 5,
    },
];


const ReviewList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post username={item.username} imageUrl={item.imageUrl} caption={item.caption} likes={item.likes} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        marginTop: 40
    },

});
export default ReviewList;
