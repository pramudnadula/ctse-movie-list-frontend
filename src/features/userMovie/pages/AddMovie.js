import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TitleText } from '../styles/add';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Pressable, Modal, TouchableOpacity, View, Button, Alert, Switch, Text, TextInput, StyleSheet, ScrollView, Image, DatePickerIOS } from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import { Container, ImageContainer, SelectContainer, Input, InputContainer, InputTextArea, InputView, RadioContainer, RadioHolder, SelectImage, TitleText, SwichGroup, OneSwitch } from '../styles/add';
//import { EventImage } from "../styles/all";
//import { Picker } from '@react-native-picker/picker';
//import * as ImagePicker from 'expo-image-picker';
//
//import DateTimePickerModal from "react-native-modal-datetime-picker";
//import DatePicker from '@react-native-community/datetimepicker';
//import NavigationBottomBar from '../../../components/NavigationBottomBar'
//import SideBar from '../../../components/SideBar'


function AddMovie({ navigation }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const path = "http://192.168.1.122:8070"
    //const path = "http://192.168.13.189:8070"




    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        // try {
        //     const value = await AsyncStorage.getItem('uid')
        //     if (value !== null) {
        //         setuid(value)
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    const onChangeTextComment = (value) => {
        setComment(value)
    }

    const handleFormSubmit = () => {
        console.log(`Title: ${title}\nDate: ${date}\nComment: ${comment}`);

        if (title === '') {
            alert("Please select an title")
            return
        }

        if (date === '') {
            alert("Please enter the date")
            return
        }



        if (comment === '') {
            alert("Please enter the description")
            return
        }


        const newUserMovie = {
            // uid,
            title,
            date,
            comment


        };


        axios.post(`${path}/api/userMovie/add`, newUserMovie)
            .then(data => {
                console.log(data.data)
                alert("successfully created")
                navigation.navigate("AllMovie")
            }).catch(err => {
                console.log(err)
            })

    };

    // const [selected, setSelected] = useState('movie');



    // const [img, setImg] = useState('');
    // const path = "http://192.168.1.122:8070"




    return (

        <View style={styles.container}>
            <TitleText>Create My Movies</TitleText>

            <View style={styles.form}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter Movie Name"
                    placeholderTextColor="#B3B3B3"
                />

                <Text style={styles.label}>Watch Date:</Text>
                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="Enter your Watch Date"
                    placeholderTextColor="#B3B3B3"
                // keyboardType="email-address"
                // autoCapitalize="none"
                />

                <Text style={styles.label}>Comment:</Text>
                <TextInput
                    style={styles.textArea}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Type your comment here"
                    placeholderTextColor="#B3B3B3"
                    multiline={true}
                    numberOfLines={5}
                />

                <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}

export default AddMovie;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
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
    input: {
        backgroundColor: '#383838',
        padding: 10,
        borderRadius: 5,
        color: '#FFFFFF',
        marginBottom: 15,
    },
    textArea: {
        backgroundColor: '#383838',
        padding: 10,
        borderRadius: 5,
        color: '#FFFFFF',
        height: 100,
        marginBottom: 15,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#7F5AF0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
