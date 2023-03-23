import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Card, Container, UserImage, UserInfo, ImageBox2, UserName, UserInfoText, MainRow, PostTime, PostText, PostImg, InteractionWrapper, Interaction, Interactiontext, ImageBox, ImageBoxContent, ImageBoxContent1, ImageBoxContent2, Image1, Image2, PostTitle } from "../styles/all";
import Comments from './Comments';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, serverTimestamp, runTransaction, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const Post = ({ post, onPressLike, onPressComment, onPressShare }) => {
    const navigation = useNavigation();
    const [comments, setcomments] = useState([])
    const [comment, setComment] = useState('');
    const setingcomments = (id) => {
        loadComments(id)
        setIsCommentModalVisible(true)
    }
    const gotoviewpage = () => {
        navigation.navigate('one', { pid: post.id })
    }


    const loadComments = (id) => {
        const db = getFirestore();
        const commentsRef = collection(db, `review/${id}/comments`);
        const commentsQuery = query(commentsRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            const newComments = [];
            snapshot.forEach((doc) => {
                const commentData = doc.data();
                commentData.id = doc.id;
                newComments.push(commentData);
            });
            setcomments(newComments);
        });

        return () => unsubscribe();
    }

    const addComment = async () => {
        const db = getFirestore();
        try {
            const newCommentRef = await addDoc(collection(db, `review/${post.id}/comments`), {
                text: newComment,
                uid: 'xX4OtaV4j5fLIE1k2cL7l4igkeN2',//getAuth().currentUser.uid,
                timestamp: serverTimestamp(),
            });
            console.log("Comment added with ID: ", newCommentRef.id);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [type, settype] = useState(2);
    const [liked, setliked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes || 0);
    useEffect(() => {
        checkliked()
    }, []);

    const checkliked = () => {
        const userId = 'xX4OtaV4j5fLIE1k2cL7l4igkeN2'//firebase.auth().currentUser.uid;
        const postRef = doc(getFirestore(), 'review', post.id);
        const likesRef = doc(collection(postRef, 'likes'), userId);
        getDoc(likesRef).then(doc => {
            if (doc.exists()) {
                setliked(true);
            }
        });
    }

    const handleAddComment = () => {
        // TODO: handle adding new comment to the comments list
        console.log("New Comment:", newComment);
        setNewComment("");
        setIsCommentModalVisible(false);
    }
    const handleLike = () => {
        const userId = 'xX4OtaV4j5fLIE1k2cL7l4igkeN2'//firebase.auth().currentUser.uid;
        const postRef = doc(getFirestore(), 'review', post.id);
        if (!liked) {

            setliked(true);
            setLikesCount(likesCount + 1);
            runTransaction(getFirestore(), async transaction => {
                const postDoc = await transaction.get(postRef);
                const newLikesCount = likesCount + 1;
                transaction.update(postRef, { likes: newLikesCount });
                const likesRef = collection(postRef, 'likes');
                transaction.set(doc(likesRef, userId), { createdAt: serverTimestamp() });
                return newLikesCount;
            }).then(newLikesCount => {

            }).catch(error => {
                console.error(error);
            });
        } else {
            setliked(false);
            setLikesCount(likesCount - 1);
            runTransaction(getFirestore(), async transaction => {
                const postDoc = await transaction.get(postRef);
                const newLikesCount = likesCount - 1;
                transaction.update(postRef, { likes: newLikesCount });
                const likesRef = collection(postRef, 'likes');
                transaction.delete(doc(likesRef, userId), { createdAt: serverTimestamp() });
                return newLikesCount;
            }).then(newLikesCount => {

            }).catch(error => {
                console.error(error);
            });
        }
    };
    const chnagelike = () => {
        setliked(!liked)
    }

    return (

        <Card>
            <MainRow>
                <UserInfo>
                    <UserImage source={{ uri: "https://picsum.photos/id/10/50/50" }} />
                    <UserInfoText>
                        <UserName>Kavindu Chamith</UserName>
                        <PostTime>
                            4 hours ago
                        </PostTime>
                    </UserInfoText>

                </UserInfo>
                <View>
                    <TouchableOpacity style={styles.viewBtn} onPress={() => { gotoviewpage() }}>
                        <MaterialIcons name="visibility" size={24} color="white" />
                        <Text style={styles.viewBtntext}>View</Text>
                    </TouchableOpacity>
                </View>
            </MainRow>

            <PostText>
                <Text style={{ color: 'white' }}>{post.title}</Text>

            </PostText>

            {
                post.type === 3 ? <>

                    <ImageBox>
                        <ImageBoxContent2>
                            <Image2 source={{ uri: post.img1 }} />
                            <Image2 source={{ uri: post.img2 }} />
                        </ImageBoxContent2>

                        <ImageBoxContent2>

                            <Image2 source={{ uri: post.img3 }} />
                            <Image2 source={{ uri: post.img4 }} />
                        </ImageBoxContent2>

                    </ImageBox>
                </> : <></>
            }
            {
                post.type == 2 ? <>

                    <ImageBox>
                        <ImageBoxContent1>
                            <Image1 source={{ uri: post.img1 }} />
                        </ImageBoxContent1>

                        <ImageBoxContent2>
                            <Image2 source={{ uri: post.img2 }} />
                            <Image2 source={{ uri: post.img3 }} />
                        </ImageBoxContent2>

                    </ImageBox>
                </> : <>

                </>
            }

            {
                post.type === 1 ? <>
                    <ImageBox>
                        <PostImg source={{ uri: post.img1 }} />
                    </ImageBox>
                </> : <></>
            }
            <View style={styles.postFooter}>
                {post.like ? <>
                    <TouchableOpacity onPress={handleLike} style={styles.iconContainer}>
                        {liked ? <FontAwesome name="thumbs-up" size={24} color="#fb5b5a" /> : <FontAwesome5 name="thumbs-up" size={24} color="#fb5b5a" />}


                        <Text style={styles.iconText}>{likesCount} likes</Text>
                    </TouchableOpacity>
                </> : <></>}
                {post.comment ? <>

                    <TouchableOpacity onPress={() => setingcomments(post.id)} style={styles.iconContainer}>
                        <MaterialIcons name="chat-bubble-outline" size={24} color="#fb5b5a" />
                        <Text style={styles.iconText}>Comment</Text>
                    </TouchableOpacity></> : <></>}
                <TouchableOpacity onPress={onPressShare} style={styles.iconContainer}>
                    <MaterialIcons name="share" size={24} color="#fb5b5a" />
                    <Text style={styles.iconText}>Share</Text>
                </TouchableOpacity>
            </View>

            {/* <InteractionWrapper>
                    {item.like ? <>
                        <Interaction active={exist} onPress={() => addLike(item._id)}>
                            <Ionicons name={exist ? "heart" : "heart-outline"} color={exist ? "#0099FF" : "#333"} size={25} />
                            <Interactiontext active={exist}>{item?.likes?.length !== 0 ? <>{item?.likes?.length}</> : <></>} Like</Interactiontext>
                        </Interaction>
                    </> : <></>}

                    {item.comment ? <>
                        <Interaction onPress={() => visible(item)}>
                            <Ionicons name="md-chatbubble-outline" size={25} />
                            <Interactiontext>{item?.comments?.length !== 0 ? <>{item?.comments?.length}</> : <></>} Comment</Interactiontext>
                        </Interaction>
                    </> : <></>}


                </InteractionWrapper> */}
            <Modal visible={isCommentModalVisible} style={styles.modal} transparent={true}>
                <View style={styles.commentModal}>
                    <View style={styles.commentModalContent}>
                        <TouchableOpacity onPress={() => setIsCommentModalVisible(false)} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Add a comment..."
                                placeholderTextColor="#888"
                                multiline
                                value={newComment}
                                onChangeText={setNewComment}
                            />
                            <TouchableOpacity onPress={() => addComment()} style={styles.postButton}>
                                <Text style={styles.postButtonText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Sample Comments */}
                        <View style={styles.sampleCommentsContainer}>
                            {comments.map((comment, index) => (
                                <Comments com={comment} />
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </Card >



    );
};

const styles = StyleSheet.create({
    post: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    postImage: {
        width: '100%',
        aspectRatio: 1,
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#222',
        width: '100%',
        height: '100%'
    },
    iconText: {
        marginLeft: 5,
        color: 'white',
    },
    caption: {
        padding: 10,
        fontSize: 16,
    },
    commentModal: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    commentModalContent: {
        padding: 20,
        width: '90%',
        height: '90%',
        backgroundColor: '#222',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    commentInputContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    postButton: {
        backgroundColor: '#fb5b5a',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sampleCommentsContainer: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginTop: 10,
    },
    comment: {
        marginBottom: 5,
        fontSize: 14,
        color: '#fff'
    },
    commentUsername: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#fff'
    },
    commentText: {
        fontSize: 16,
        marginLeft: 5,
    },
    viewBtn: {
        backgroundColor: '#fb5b5a',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        marginRight: 8
    },
    viewBtntext: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default Post;