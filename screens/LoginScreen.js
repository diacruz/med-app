import React, { Component, useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const Login = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('There was an error', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const loginAsyncHandler = async () => {
    let action = AuthActions.login(email, password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Categories')
    } catch (err) {
      setError(err.message);
      setIsLoading(false)
    }
  };


  return (
    <KeyboardAvoidingView styles={styles.container} behavior="position" enabled keyboardVerticalOffset="100">
      <View>
        <Image style={styles.logo} source={require('../data/logo.png')} />
      </View>
      <View styles={styles.view}>
        <TextInput
          style={[styles.textField, styles.email]}
          placeholder='Email'
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          style={styles.textField}
          placeholder='Password'
          onChangeText={text => setPassword(text)}
        />
        {isLoading ? (<ActivityIndicator size="small" color={Colors.primaryColor}/>) :
            <TouchableOpacity style={styles.loginButton} onPress={loginAsyncHandler}>
              <Text style={styles.text}>Log in</Text>
            </TouchableOpacity>
            }
        <TouchableOpacity style={styles.signUpButton} onPress={() => {
          props.navigation.navigate('SignUp')
        }}
        >
          <Text style={styles.text}>New? Create an account!</Text>
        </TouchableOpacity>
      </View>
    </ KeyboardAvoidingView>
  );
}


let screenHeight = Math.round(Dimensions.get('window').height)
let screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  textField: {
    fontFamily: 'open-sans-bold',
    height: 60,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 30,
  },
  email: {
    marginBottom: 30,
    marginTop: screenHeight * 0.18
  },
  loginButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    width: 250,
    backgroundColor: '#00ffb8',
    borderRadius: 30,
  },
  signUpButton: {
    marginTop: 20,
    borderColor: '#00e6a4',
    borderWidth: 2,
    alignSelf: 'center',
    padding: 10,
    width: 250,

    borderRadius: 30,
  },
  text: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 30
  }
})

export default Login;