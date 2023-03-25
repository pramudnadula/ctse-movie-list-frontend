import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

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
  checkboxView: {
    display: 'flex',
  },
});

function CreateUser() {
  const navigation = useNavigation();
  const auth = getAuth();
  const database = getFirestore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const handleCreateUser = async () => {
    try {
      if (email === '') {
        Toast.show({
          type: 'error', // success, error, info
          text1: "Email Field can't be empty",
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
        return;
      }
      if (password === '') {
        Toast.show({
          type: 'error', // success, error, info
          text1: "Password Field can't be empty",
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
        return;
      }
      if (password !== tempPassword) {
        Toast.show({
          type: 'error', // success, error, info
          text1: "Passwords don't match.",
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
        return;
      }
      if (name === '') {
        Toast.show({
          type: 'error', // success, error, info
          text1: "Name Field can't be empty",
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
        return;
      }

      const userObj = {
        email,
        password,
        name,
        gender: '',
        country,
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        isAdmin: true,
      };

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(database, 'users', userCredentials.user.uid);
      await setDoc(userRef, userObj);
      console.log('User Created Successfully');
      Toast.show({
        type: 'success', // success, error, info
        text1: 'User Created Successfully',
        topOffset: 100,
        visibilityTime: 1500, // if don't set this, it calls the default
      });
      setTimeout(function () {
        navigation.navigate('users');
      }, 1500);
    } catch (err) {
      console.log(err.code);
      if (err.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error', // success, error, info
          text1: 'Email already in use.',
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
      } else if (err.code === 'auth/weak-password') {
        Toast.show({
          type: 'error', // success, error, info
          text1: 'Weak Password. Need atleast 6 characters.',
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
      } else {
        Toast.show({
          type: 'error', // success, error, info
          text1: 'Something went wrong',
          topOffset: 100,
          visibilityTime: 1500, // if don't set this, it calls the default
        });
      }
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
        <TouchableOpacity style={style.registerBtn} onPress={() => handleCreateUser()}>
          <Text style={style.registerText}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default CreateUser;
