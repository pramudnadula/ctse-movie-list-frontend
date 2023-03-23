import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, View, Switch, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Container, ImageContainer, SelectContainer, Input, InputContainer, InputTextArea, InputView, RadioContainer, RadioHolder, SelectImage, TitleText, SwichGroup, OneSwitch, AddImage, VisibleImageBox, EditButton } from '../styles/add';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from 'expo-image-picker';
import StarRating from 'react-native-star-rating';
import RatingInput from '../components/Rating';
import { POST } from '../../../common/httphelper';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Loading from '../components/Loading';
export default function ReviewEdit() {
    const route = useRoute();
    const { pid } = route.params;
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [type, setType] = useState(1);
    const [mname, setmname] = useState('');
    const [des, setdes] = useState('');
    const [rate, setrate] = useState('');
    const [img1, setimg1] = useState('');
    const [img2, setimg2] = useState('');
    const [img3, setimg3] = useState('');
    const [img4, setimg4] = useState('');
    const [vlink, setvlink] = useState('');
    const [isValiddes, setisValiddes] = useState(true);
    const [isValidtitle, setisValidtitle] = useState(true);
    const [isValidmname, setisValidmname] = useState(true);
    const [isValidvlink, setisValidvlink] = useState(true);
    const [isValidim1, setisValidim1] = useState(true);
    const [isValidim2, setisValidim2] = useState(true);
    const [isValidim3, setisValidim3] = useState(true);
    const [isValidim4, setisValidim4] = useState(true);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [loading, setloading] = useState(false);
    const [post, setpost] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    useEffect(() => {

        loadDocumentById()
    }, [pid])

    const loadDocumentById = async () => {
        setloading(true)
        try {
            const db = getFirestore();
            const docRef = doc(db, 'review', pid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const posts = docSnap.data()
                posts.id = docSnap.id
                setpost(posts)
                setTitle(posts.title)
                setmname(posts.mname)
                setdes(posts.Description)
                setvlink(posts.vlink)
                setType(posts.type)
                setimg1(posts.img1)
                setimg2(posts.img2)
                setimg3(posts.img3)
                setimg4(posts.img4)
                setrate(docSnap.data().rate)
                setIsEnabled1(posts.like)
                setIsEnabled2(posts.comment)
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

    const selectedone = (value) => {
        setrate(value);
    }
    const validate = () => {
        if (title === '') {
            setisValidtitle(false)
            return false;
        } else {
            setisValidtitle(true)
        }
        if (mname === '') {
            setisValidmname(false)
            return false;
        } else {
            setisValidmname(true)
        }
        if (des === '') {
            setisValiddes(false)
            return false;
        } else {
            setisValiddes(true)
        }


        if (vlink === '') {
            setisValidvlink(false)
            return false;
        } else {
            setisValidvlink(true)
        }
        if (type === 1) {
            if (img1 === '') {
                setisValidim1(false)
                return false;
            }
            else {
                setisValidim1(true)
            }
        } else if (type === 2) {
            if (img1 === '') {
                setisValidim1(false)
                return false;
            }
            else {
                setisValidim1(true)
            }
            if (img2 === '') {
                setisValidim2(false)
                return false;
            }
            else {
                setisValidim2(true)
            }
            if (img3 === '') {
                setisValidim3(false)
                return false;
            }
            else {
                setisValidim3(true)
            }
        } else {
            if (img1 === '') {
                setisValidim1(false)
                return false;
            }
            else {
                setisValidim1(true)
            }
            if (img2 === '') {
                setisValidim2(false)
                return false;
            }
            else {
                setisValidim2(true)
            }
            if (img3 === '') {
                setisValidim3(false)
                return false;
            }
            else {
                setisValidim3(true)
            }
            if (img4 === '') {
                setisValidim4(false)
                return false;
            }
            else {
                setisValidim4(true)
            }
        }
        return true;
    }
    const handleFormSubmit = async () => {
        const valid = validate()
        if (!valid) {
            return;
        }
        const ob = {
            title,
            mname,
            Description: des,
            img1,
            img2,
            img3,
            img4,
            type,
            vlink,
            rate,
            comment: isEnabled2,
            like: isEnabled1,
            likes: post.likes,
            comments: 0,
            uid: post.uid,//getAuth().currentUser.uid,
        }
        const db = getFirestore();
        const docRef = doc(db, "review", post.id);
        await updateDoc(docRef, ob);
        showMessage({
            message: "Document updated successfully!",
            type: "success",
        });
        setTimeout(() => {
            navigation.navigate('my')
        }, 1000);


    };
    const handleImagePicker = async (index) => {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                // Get the Firebase storage reference for the image
                const storage = getStorage();
                const imageRef = ref(storage, `images/${Date.now()}.jpg`);

                // Convert the image to bytes for upload
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        console.log(e);
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', result.uri, true);
                    xhr.send(null);
                });

                // Upload the bytes to Firebase storage
                await uploadBytes(imageRef, blob);
                const imageUrl = await getDownloadURL(imageRef);
                if (index === 1) {
                    setimg1(imageUrl)
                    setisValidim1(true)
                } else if (index === 2) {
                    setimg2(imageUrl)
                    setisValidim2(true)
                } else if (index === 3) {
                    setimg3(imageUrl)
                    setisValidim3(true)
                } else if (index === 4) {
                    setimg4(imageUrl)
                    setisValidim4(true)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={loading ? styles.container2 : styles.container}>
                {loading ? <Loading /> : <>
                    <View style={styles.form}>

                        <Text style={styles.label}>Title:</Text>
                        <TextInput
                            style={[styles.input, !isValidtitle && styles.invalidInput]}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter the Title"
                            placeholderTextColor="#B3B3B3"
                        />
                        {!isValidtitle && <Text style={styles.errorText}>Please enter a valid title</Text>}

                        <Text style={styles.label}>Movie Name:</Text>
                        <TextInput
                            style={[styles.input, !isValidmname && styles.invalidInput]}
                            value={mname}
                            onChangeText={setmname}
                            placeholder="Enter the Movie name"
                            placeholderTextColor="#B3B3B3"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {!isValidmname && <Text style={styles.errorText}>Please enter a valid Movie Name</Text>}

                        <Text style={styles.label}>Description:</Text>
                        <TextInput
                            style={[styles.textArea, !isValiddes && styles.invalidInput]}
                            value={des}
                            onChangeText={setdes}
                            placeholder="Type the description here"
                            placeholderTextColor="#B3B3B3"
                            multiline={true}
                            numberOfLines={5}
                        />
                        {!isValiddes && <Text style={styles.errorText}>Please enter a valid description</Text>}
                        <Text style={styles.label}>Video Link:</Text>
                        <TextInput
                            style={[styles.textArea, !isValidvlink && styles.invalidInput]}
                            value={vlink}
                            onChangeText={setvlink}
                            placeholder="Type the Video Link here"
                            placeholderTextColor="#B3B3B3"
                            multiline={true}
                            numberOfLines={5}
                        />
                        {!isValidvlink && <Text style={styles.errorText}>Please enter a valid link</Text>}
                        <Text style={styles.label}>Images:</Text>
                        <View style={styles.imageUploadContainer}>
                            {type === 1 || type === 2 || type === 3 ? <>
                                <Text style={styles.label}>Image 1 url:</Text>

                                {img1 !== '' ? <>
                                    <View style={styles.showpic}>
                                        <Image style={styles.showim} source={{ uri: img1 }} />
                                        <TouchableOpacity onPress={() => setimg1('')}>
                                            <View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
                                                <Ionicons name="trash" size={32} color="#fb5b5a" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </> : <>
                                    <TouchableOpacity style={styles.buttond} onPress={() => handleImagePicker(1)}>
                                        <Text style={styles.buttonText}>Image 1</Text>
                                    </TouchableOpacity>
                                </>}
                                {!isValidim1 && <Text style={styles.errorText}>Please enter a valid url</Text>}

                            </> : <></>}

                            {type === 2 || type === 3 ? <>


                                <Text style={styles.label}>Image 2 url:</Text>
                                {img2 !== '' ? <>
                                    <View style={styles.showpic}>
                                        <Image style={styles.showim} source={{ uri: img2 }} />
                                        <TouchableOpacity onPress={() => setimg2('')}>
                                            <View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
                                                <Ionicons name="trash" size={32} color="#fb5b5a" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </> : <>
                                    <TouchableOpacity style={styles.buttond} onPress={() => handleImagePicker(2)}>
                                        <Text style={styles.buttonText}>Image 2</Text>
                                    </TouchableOpacity>
                                </>}

                                {!isValidim2 && <Text style={styles.errorText}>Please enter a valid url</Text>}
                                <Text style={styles.label}>Image 3 url:</Text>

                                {img3 !== '' ? <>
                                    <View style={styles.showpic}>
                                        <Image style={styles.showim} source={{ uri: img3 }} />
                                        <TouchableOpacity onPress={() => setimg3('')}>
                                            <View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
                                                <Ionicons name="trash" size={32} color="#fb5b5a" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </> : <>
                                    <TouchableOpacity style={styles.buttond} onPress={() => handleImagePicker(3)}>
                                        <Text style={styles.buttonText}>Image 3</Text>
                                    </TouchableOpacity>
                                </>}

                                {!isValidim3 && <Text style={styles.errorText}>Please enter a valid url</Text>}
                            </> : <></>}

                            {type === 3 ? <>
                                <Text style={styles.label}>Image 4 url:</Text>
                                {img4 !== '' ? <>
                                    <View style={styles.showpic}>
                                        <Image style={styles.showim} source={{ uri: img4 }} />
                                        <TouchableOpacity onPress={() => setimg4('')}>
                                            <View style={{ padding: 8, alignSelf: 'center', marginLeft: 40 }}>
                                                <Ionicons name="trash" size={32} color="#fb5b5a" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </> : <>
                                    <TouchableOpacity style={styles.buttond} onPress={() => handleImagePicker(4)}>
                                        <Text style={styles.buttonText}>Image 4</Text>
                                    </TouchableOpacity>
                                </>}


                                {!isValidim4 && <Text style={styles.errorText}>Please enter a valid url</Text>}
                            </> : <></>}

                        </View>
                        <Text style={styles.label}>Rate the Movie</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={rate}
                            selectedStar={(rating) => setrate(rating)}
                            fullStarColor="#fb5b5a"
                            starSize={40}
                            containerStyle={{ marginVertical: 20 }}
                        />

                        <SwichGroup>
                            <OneSwitch>
                                <Text style={styles.label}>Likes</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#fb5b5a' }}
                                    thumbColor={isEnabled1 ? '#fb5b5a' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch1}
                                    value={isEnabled1}
                                />
                            </OneSwitch>

                            <OneSwitch>
                                <Text style={styles.label}>Comments</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#fb5b5a' }}
                                    thumbColor={isEnabled2 ? '#fb5b5a' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch2}
                                    value={isEnabled2}
                                />
                            </OneSwitch>
                        </SwichGroup>
                        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </>}

            </View>
            <FlashMessage position="bottom" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 8
    }, invalidInput: {
        borderColor: 'red',
        borderWidth: 2,
    },
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        backgroundColor: '#fb5b5a',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttond: {
        backgroundColor: '#383838',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },

    imageUploadersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    imageUploader: {
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 10,
        width: '60%',
        alignItems: 'center',
        marginBottom: 8
    },
    imageUploaderText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    showpic: {
        display: 'flex',
        flexDirection: 'row',
        height: 200,
        width: 130,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    showim: {
        width: '100%',
        height: '100%'
    },
    darkButton: {
        backgroundColor: '#121212',
        color: 'black',
        borderRadius: 5,
        padding: 10,
    },
    container2: {
        backgroundColor: '#222',
        height: 700
    },

});
