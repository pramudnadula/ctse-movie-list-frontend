import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import YouTube from 'react-native-youtube';


export default function Review() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>

                    <Text style={styles.title}>Avengers</Text>

                </View>
                <Text style={styles.head}>The Last Game</Text>
                <View style={styles.imagesContainer}>
                    <Image
                        source={{ uri: 'https://c.ndtvimg.com/2019-04/2rpnoa2g_avengers-review-facebook_625x300_26_April_19.jpg?im=Resize=(1230,900)' }}
                        style={styles.image}
                    />
                    <Image
                        source={{ uri: 'https://c.ndtvimg.com/2019-04/2rpnoa2g_avengers-review-facebook_625x300_26_April_19.jpg?im=Resize=(1230,900)' }}
                        style={styles.image}
                    />
                    <Image
                        source={{ uri: 'https://c.ndtvimg.com/2019-04/2rpnoa2g_avengers-review-facebook_625x300_26_April_19.jpg?im=Resize=(1230,900)' }}
                        style={styles.image}
                    />


                    <View style={styles.containers}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="chatbox-outline" size={24} color="#fb5b5a" />
                            <Text style={{ color: '#fff' }}>Comments</Text>
                            <Text style={styles.iconText}>{20}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Ionicons name="heart-outline" size={24} color="#fb5b5a" />
                            <Text style={{ color: '#fff' }}>Likes</Text>
                            <Text style={styles.iconText}>{23}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                        lobortis nibh. Mauris pulvinar nisi vel odio bibendum eleifend.
                        Pellentesque auctor ultricies risus ac malesuada. Nulla hendrerit
                        lectus vel nisi feugiat, ac malesuada tellus tincidunt. Praesent
                        non magna in nibh venenatis bibendum ac sit amet libero.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center'
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
        marginLeft: 6
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
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    iconText: {
        color: '#fb5b5a',
        marginLeft: 5,
    },
    head: {
        fontSize: 26,
        color: '#fb5b5a',
        marginTop: 20,


    }
});
