import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { GET } from '../../../common/httphelper';
import Post from '../components/Post';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


const ReviewList = () => {
    const db = getFirestore()
    const store = getStorage()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {

        const reviewsRef = collection(db, 'review');
        const querySnapshot = await getDocs(reviewsRef);
        const reviews = [];
        querySnapshot.forEach((doc) => {
            const review = doc.data();
            review.id = doc.id;
            reviews.push(review);
        });
        setPosts(reviews)

    }
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        height: '100%',
        width: '100%',

    },

});
export default ReviewList;
