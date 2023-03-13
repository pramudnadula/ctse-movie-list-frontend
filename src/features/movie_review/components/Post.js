import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Container, UserImage, UserInfo, UserName, UserInfoText, MainRow, PostTime, PostText, PostImg, InteractionWrapper, Interaction, Interactiontext, ImageBox, ImageBoxContent, ImageBoxContent1, ImageBoxContent2, Image1, Image2, PostTitle } from "../styles/all";
import Comments from './Comments';


const Post = ({ post, onPressLike, onPressComment, onPressShare }) => {
    const comments = [
        { username: 'user1', text: 'comment 1' },
        { username: 'user2', text: 'comment 2' },
    ];

    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [type, settype] = useState(2);


    const handleAddComment = () => {
        // TODO: handle adding new comment to the comments list
        console.log("New Comment:", newComment);
        setNewComment("");
        setIsCommentModalVisible(false);
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
                    <TouchableOpacity style={styles.viewBtn} onPress={() => { }}>
                        <MaterialIcons name="visibility" size={24} color="white" />
                        <Text style={styles.viewBtntext}>View</Text>
                    </TouchableOpacity>
                </View>
            </MainRow>

            <PostText>
                <Text style={{ color: 'white' }}>{post.title}</Text>

            </PostText>

            {
                type === 3 ? <>

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
                type == 2 ? <>

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
                type === 1 ? <>
                    <ImageBox>
                        <PostImg source={{ uri: post.img1 }} />
                    </ImageBox>
                </> : <></>
            }
            <View style={styles.postFooter}>
                <TouchableOpacity onPress={onPressLike} style={styles.iconContainer}>
                    <MaterialIcons name="thumb-up" size={24} color="#fb5b5a" />
                    <Text style={styles.iconText}>20 likes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsCommentModalVisible(true)} style={styles.iconContainer}>
                    <MaterialIcons name="chat-bubble-outline" size={24} color="#fb5b5a" />
                    <Text style={styles.iconText}>Comment</Text>
                </TouchableOpacity>
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
                            <TouchableOpacity onPress={handleAddComment} style={styles.postButton}>
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
        backgroundColor: '#fff',
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
        backgroundColor: '#2980b9',
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
    },
    commentUsername: {
        fontWeight: 'bold',
        marginRight: 5,
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