import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Comments from './Comments';

const Post = ({ username, imageUrl, caption, likes, onPressLike, onPressComment, onPressShare }) => {
    const comments = [
        { username: 'user1', text: 'comment 1' },
        { username: 'user2', text: 'comment 2' },
    ];
    const [isCommentModalVisible, setIsCommentModalVisible] = React.useState(false);
    const [newComment, setNewComment] = React.useState("");

    const handleAddComment = () => {
        // TODO: handle adding new comment to the comments list
        console.log("New Comment:", newComment);
        setNewComment("");
        setIsCommentModalVisible(false);
    }

    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/id/10/50/50' }} />
                <Text style={styles.username}>{username}</Text>
            </View>
            <Image style={styles.postImage} source={{ uri: imageUrl }} resizeMode="contain" />
            <View style={styles.postFooter}>
                <TouchableOpacity onPress={onPressLike} style={styles.iconContainer}>
                    <MaterialIcons name="thumb-up" size={24} color="#666" />
                    <Text style={styles.iconText}>{likes} likes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsCommentModalVisible(true)} style={styles.iconContainer}>
                    <MaterialIcons name="chat-bubble-outline" size={24} color="#666" />
                    <Text style={styles.iconText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressShare} style={styles.iconContainer}>
                    <MaterialIcons name="share" size={24} color="#666" />
                    <Text style={styles.iconText}>Share</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.caption}>{caption}</Text>

            {/* Comment Modal */}
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
        </View>
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
    },
    modal: {

        width: '100%',
        height: '100%'
    },
    iconText: {
        marginLeft: 5,
        color: '#666',
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
        width: '80%',
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


});

export default Post;