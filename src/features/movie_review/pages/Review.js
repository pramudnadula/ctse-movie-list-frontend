import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import YouTube from 'react-native-youtube';
import { useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    serverTimestamp,
    runTransaction,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore';
import Loading from '../components/Loading';
import RatingInput from '../components/Rating';
import FloatingButton from '../components/FloatingButton';
export default function Review() {
    const route = useRoute();
    const { pid } = route.params;
    const [post, setpost] = useState({});
    const [loading, setloading] = useState(false);
    const [commentslemght, setcommentslemght] = useState(0);
    useEffect(() => {
        loadDocumentById();
    }, [pid]);

    const loadDocumentById = async () => {
        setloading(true);
        try {
            const db = getFirestore();
            const commentsRef = collection(db, `review/${pid}/comments`);
            const querySnapshot = await getDocs(commentsRef);
            const documentCount = querySnapshot.size;
            setcommentslemght(documentCount);
            const docRef = doc(db, 'review', pid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const posts = docSnap.data();
                posts.id = docSnap.id;
                setpost(posts);
                setloading(false);
            } else {
                console.log('Document does not exist!');
                return null;
            }
        } catch (error) {
            console.log('Error loading document:', error);
            return null;
        }
    };
    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={loading ? styles.container2 : styles.container}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.title}>{post.mname}</Text>
                            </View>
                            <Text style={styles.head}>{post.title}</Text>
                            <View style={styles.imagesContainer}>
                                {post.type === 1 ? (
                                    <Image source={{ uri: post.img1 }} style={styles.image} />
                                ) : (
                                    <>
                                        {post.type === 2 ? (
                                            <>
                                                <Image source={{ uri: post.img1 }} style={styles.image} />
                                                <Image source={{ uri: post.img2 }} style={styles.image} />
                                                <Image source={{ uri: post.img3 }} style={styles.image} />
                                            </>
                                        ) : (
                                            <>
                                                {post.type === 3 ? (
                                                    <>
                                                        <Image source={{ uri: post.img1 }} style={styles.image} />
                                                        <Image source={{ uri: post.img2 }} style={styles.image} />
                                                        <Image source={{ uri: post.img3 }} style={styles.image} />
                                                        <Image source={{ uri: post.img4 }} style={styles.image} />
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}

                                <View style={styles.containers}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="chatbox-outline" size={24} color="#fb5b5a" />
                                        <Text style={{ color: '#fff' }}>Comments</Text>
                                        <Text style={styles.iconText}>{commentslemght}</Text>
                                    </View>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="heart-outline" size={24} color="#fb5b5a" />
                                        <Text style={{ color: '#fff' }}>Likes</Text>
                                        <Text style={styles.iconText}>{post.likes}</Text>
                                    </View>
                                </View>
                                <Text style={styles.label}>Trailer of {post.mname}</Text>
                                <YoutubePlayer
                                    height={200}
                                    width={300}
                                    videoId={post.vlink}
                                    resumePlayAndroid={false}
                                    webViewStyle={{ opacity: 0.99 }}

                                />
                                <RatingInput view={true} def={post.rate} />
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.descriptionText}>{post.Description}</Text>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
            <FloatingButton />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        backgroundColor: '#222',
        height: 700,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        backgroundColor: '#333',
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    imagesContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 10,
    },
    descriptionContainer: {
        padding: 10,
        marginLeft: 6,
    },
    descriptionText: {
        padding: 15,
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
    },
    containers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        marginBottom: 40,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
    },
    iconText: {
        color: '#fb5b5a',
        marginLeft: 5,
    },
    head: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fb5b5a',
        marginTop: 20,
        fontStyle: 'italic'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
});
