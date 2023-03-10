import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Comments = ({ avatarUrl, com }) => {
    return (
        <View style={styles.comment}>
            <Image style={styles.avatar} source={{ uri: "https://picsum.photos/id/10/50/50" }} />
            <View style={styles.commentContent}>
                <Text style={styles.commentUsername}>{com.username}</Text>
                <Text style={styles.commentText}>{com.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    comment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 25,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUsername: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    commentText: {
        fontSize: 13,
    },
});

export default Comments;