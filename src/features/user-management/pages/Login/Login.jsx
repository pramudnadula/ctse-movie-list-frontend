import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
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
  loginBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  loginText: {
    fontSize: 18,
    fontWeight: 900,
  },
  registerText: {
    color: '#fff',
  },
});

function Login() {

  const auth = getAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState('ravindu@gmail.com');
  const [password, setPassword] = useState('Abc123');

  const handleLogin = async () => {
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

      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('uid', userCredentials.user.uid);
      showMessage({
        message: 'Logged in Successfully',
        type: 'success',
      });

      setTimeout(function () {
        navigation.navigate('home');
      }, 1500);
    } catch (err) {
      console.log(err.code);
      if (err.code === 'auth/wrong-password') {
        showMessage({
          message: 'Invalid Password.',
          type: 'danger',
        });
      } else if (err.code === 'auth/user-not-found') {
        showMessage({
          message: 'User not found.',
          type: 'danger',
        });
      } else if (err.code === 'auth/invalid-email') {
        showMessage({
          message: 'Invalid Email.',
          type: 'danger',
        });
      }
    }
  };

  const handleNavigate = () => {
    navigation.navigate('register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}
    >
      <View style={style.inputView}>
        <TextInput
          style={style.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={style.inputView}>
        <TextInput
          style={style.inputText}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text
        style={style.registerText}
        onPress={handleNavigate}
      >
        Click Here to Register
      </Text>
      <TouchableOpacity
        onPress={handleLogin}
        style={style.loginBtn}
      >
        <Text style={style.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Login;
