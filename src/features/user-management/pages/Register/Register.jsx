import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, uploadBytes } from '@firebase/storage';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { showMessage } from 'react-native-flash-message';

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#222',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    borderColor: '#fff',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  inputText: {
    height: 50,
  },
  registerBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  registerText: {
    fontSize: 18,
    fontWeight: 900,
  },
  loginText: {
    color: '#fff',
  },
});

function Register() {

  const navigation = useNavigation();
  const auth = getAuth();
  const database = getFirestore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      setLoading(true);

      if (!result.canceled) {
        const storage = getStorage();
        const imageRef = ref(storage, `users/${Date.now()}.jpg`);
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

        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);
        setPhoto(imageUrl);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('login');
  };

  const handleRegister = async () => {
    try {
      if (email === '') {
        showMessage({
          message: "Email Field can't be empty",
          type: 'warning',
        });
        return;
      }
      if (password === '') {
        showMessage({
          message: "Password Field can't be empty",
          type: 'warning',
        });
        return;
      }
      if (password !== tempPassword) {
        showMessage({
          message: "Passwords don't match.",
          type: 'warning',
        });
        return;
      }
      if (name === '') {
        showMessage({
          message: "Name Field can't be empty",
          type: 'warning',
        });
        return;
      }

      const userObj = {
        email,
        password,
        name,
        gender,
        country,
        photo,
      };

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(database, 'users', userCredentials.user.uid);
      await setDoc(userRef, userObj);
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'Something went wrong.',
        type: 'danger',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={style.scrollView}
      automaticallyAdjustKeyboardInsets={true}
      contentInsetAdjustmentBehavior={'automatic'}
    >
      <View style={style.container}>
        <View style={style.inputView}>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={style.inputText} />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={style.inputText}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Re-enter Password"
            value={tempPassword}
            secureTextEntry={true}
            onChangeText={setTempPassword}
            style={style.inputText}
          />
        </View>
        <View style={style.inputView}>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={style.inputText} />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            style={style.inputText}
          />
        </View>
        {/* <View style={style.inputView}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View> */}
        {/* <View style={style.inputView}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Text>Image</Text>
          </TouchableOpacity>
        </View> */}
        <Text
          style={style.loginText}
          onPress={handleNavigate}
        >
          Click Here to Login
        </Text>
        <TouchableOpacity
          style={style.registerBtn}
          onPress={() => handleRegister()}
        >
          <Text style={style.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Register;
