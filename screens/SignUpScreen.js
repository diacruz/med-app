import React, { Component, useState, useCallback, useEffect, useReducer } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, StyleSheet, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import UserPermission from '../utilities/UserPermission'
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth';
import { isLoaded } from '../node_modules/expo-font/build/Font';
import Colors from '../constants/Colors';

const SignUp = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  const dispatch = useDispatch()

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /*
    const signupHandler = useCallback(() => {
        await dispatch(AuthActions.signup(email, password))
    }, [dispatch, email, password]);
  */
  useEffect(() => {
    if (error) {
      Alert.alert('There was an error', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const signupAsyncHandler = async () => {
    let action = AuthActions.signup(email, password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textField, styles.fullName]}
        placeholder='Fullname'
        keyboardType="default"
        onChangeText={text => setDisplayName(text)}
        value={displayName}
        required
        errorText="Please enter a valid name"
      />
      <TextInput
        style={[styles.textField, styles.email]}
        placeholder='Email'
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        value={email}
        required
        autoCapitalize="none"
        errorText="Please enter a valid email"
      />
      <TextInput
        secureTextEntry
        style={styles.textField}
        placeholder='Password (At least 6 characters)'
        keyboardType="default"
        onChangeText={text => setPassword(text)}
        value={password}
        required
        errorText="Please enter a valid password"
      />
      {isLoading ? (<ActivityIndicator size="small" color={Colors.primaryColor}/>) : 
        <TouchableOpacity style={styles.button} onPress={signupAsyncHandler}>
          <Text style={styles.text}>Confirm</Text>
        </TouchableOpacity>
      }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    borderColor: 'gray',
    borderRadius: 80,
    borderWidth: 2,
    height: 160,
    marginBottom: 30,
    width: 160,
  },

  textField: {
    fontFamily: 'open-sans-bold',
    height: 60,
    width: '80%',
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 30
  },
  fullName: {
    marginBottom: 30
  },
  email: {
    marginBottom: 30
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#00ffb8',
    padding: 10,
    width: 250
  },
  text: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  }
});

export default SignUp;
