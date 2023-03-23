import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Image, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import CalendarPicker from 'react-native-calendar-picker';
import DateField from 'react-native-datefield';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, serverTimestamp, where, runTransaction, query, orderBy, onSnapshot } from "firebase/firestore";
import { Container, ImageContainer, SelectContainer, Input, InputContainer, InputTextArea, InputView, RadioContainer, RadioHolder, SelectImage, TitleText, SwichGroup, OneSwitch, AddImage, VisibleImageBox, EditButton } from '../styles/add';
import { add } from 'react-native-reanimated';
const AddList = () => {
    const route = useRoute();
    const { pid } = route.params;
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [umid, setumid] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isEnabled2, setisEnabled2] = useState('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setloading] = useState(false)
    const [added, setadded] = useState(false)
    const [mov, setmov] = useState({})
    const db = getFirestore();
    useEffect(() => {
        setadded(false)
        loadDocumentById()
        checkadded()
    }, [pid])
    const checkadded = async () => {
        const db = getFirestore();
        let firstDoc = {}
        const userId = 'xX4OtaV4j5fLIE1k2cL7l4igkeN2'//firebase.auth().currentUser.uid;
        const movieRef = collection(db, 'userMovie');
        const querySnapshot = await getDocs(query(movieRef, where('uid', '==', userId)));
        if (!querySnapshot.empty) {
            firstDoc = querySnapshot.docs[0].data;
            firstDoc.id = querySnapshot.docs[0].id

        }
        const querySnapshots = await getDocs(collection(db, `userMovie/${firstDoc.id}/list`));
        querySnapshots.forEach((snap) => {
            if (snap.data().mid === pid) {

                setadded(true)
                return
            }
        })

    }

    const submit = async () => {
        const db = getFirestore();
        let firstDoc = {}
        const userId = 'xX4OtaV4j5fLIE1k2cL7l4igkeN2'//firebase.auth().currentUser.uid;
        const movieRef = collection(db, 'userMovie');
        const querySnapshot = await getDocs(query(movieRef, where('uid', '==', userId)));
        if (!querySnapshot.empty) {
            firstDoc = querySnapshot.docs[0].data;
            firstDoc.id = querySnapshot.docs[0].id

        }
        const ob = {
            watched: isEnabled2,
            date: date,
            rating,
            comment,
            mid: pid,
            mname: mov.mname,
            img: mov.img1
        }

        const newCommentRef = await addDoc(collection(db, `userMovie/${firstDoc.id}/list`), ob);
    }
    const loadDocumentById = async () => {
        setloading(true)
        try {
            const db = getFirestore();
            const docRef = doc(db, 'review', pid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const posts = docSnap.data()
                posts.id = docSnap.id
                setmov(posts)
                setloading(false)
            } else {
                console.log("Document does not exist!");
                return null;
            }
        } catch (error) {
            console.log("Error loading document:", error);
            return null;
        }
    }

    const onDateChange = (date) => {
        console.log('s')
        setSelectedDate(date);
    };
    const toggleSwitch2 = () => {
        setisEnabled2(!isEnabled2)
    }
    const handleDateConfirm = (date) => {
        setDate(date.toISOString().slice(0, 10));
        setIsDatePickerVisible(false);
    };

    const handleTimeConfirm = (time) => {
        setTime(time.toLocaleTimeString());
        setIsTimePickerVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <OneSwitch></OneSwitch>
                    <Text style={styles.title}>{mov.mname}</Text>
                    <Image style={styles.showim} source={{ uri: mov.img1 }} />

                    <Text style={styles.label}>Watched the movie</Text>
                    <OneSwitch>
                        <Switch
                            trackColor={{ false: '#767577', true: '#fb5b5a' }}
                            thumbColor={isEnabled2 ? '#fb5b5a' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                        />
                    </OneSwitch>
                    <Text style={styles.label}>Date You watched</Text>
                    <DateField
                        labelDate="Date"
                        labelMonth="Month"
                        labelYear="Year"
                        styleInput={{ fontSize: 15, margin: 8 }}
                        containerStyle={{ marginVertical: 20, backgroundColor: 'white', padding: 10, borderRadius: 8 }}
                        onSubmit={(value) => setDate(value)}
                    />

                    <Text style={styles.label}>Rate the Movie</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={rating}
                        selectedStar={(rating) => setRating(rating)}
                        fullStarColor="#fb5b5a"
                        starSize={40}
                        containerStyle={{ marginVertical: 20 }}
                    />
                    <TextInput
                        style={{ color: '#fff', fontSize: 24, borderWidth: 1, borderColor: '#fb5b5a', padding: 10, borderRadius: 10, width: '80%' }}
                        placeholder="Enter comment"
                        placeholderTextColor="#777"
                        multiline={true}
                        numberOfLines={4}
                        value={comment}
                        onChangeText={(comment) => setComment(comment)}
                    />
                    <TouchableOpacity disabled={added} style={{ backgroundColor: '#fb5b5a', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 20 }} onPress={() => submit()}>
                        <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center' }} >{added ? "Already added" : "Add To List"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    form: {
        margin: 20,
        width: '80%',
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    showim: {
        width: '100%',
        height: 380,
        marginBottom: 20,
        marginTop: 20
    },
    title: {
        fontSize: 25,
        color: '#fff',
        alignSelf: 'center',
        color: "#fb5b5a"
    },
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {

    }
});

export default AddList;
