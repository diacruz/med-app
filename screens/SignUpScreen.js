import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import UserPermission from '../utilities/UserPermission'
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

/**
 * Displays an alert box with the specified title
 * and message. 
 * @param {string} title 
 * @param {string} message 
 */
function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

export default class CreateAccount extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props)
    this.state = {
      fullName: "",
      username: "",
      password: "",
      avatar: "",
    }
    this.handlePickAvatar = this.handlePickAvatar.bind(this)
    this.handleFullName = this.handleFullName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }
  handleFullName(text) {
    this.setState({ fullName: text })
  }

  handleEmail(text) {
    this.setState({ username: text })
  }

  handlePassword(text) {
    this.setState({ password: text })
  }

  handlePickAvatar = async () => {
    UserPermission.getCameraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3]
    })
    if(!result.cancelled){
      this.setState({avatar: result.uri})
    }
  };

  /**
   * Clears the text inputs. This is so that if there's an error, 
   * the user doesn't have to backspace everything they put. 
   */
  clearTextInputs() {
    this.setState({fullName: "", username: "", password: "" })
  }

  /**
   * Creates an account with the specified username and password. If it works, 
   * an alert box is displayed, the user is brought to the Login page, and the 
   * user is signed out (because creating an account automatically signs the user
   * in). If it fails, an alert box is shown notifying the user of the error. 
   * @param {string} username 
   * @param {string} password 
   * @param {Object} props 
   */
  createUserAccount(fullname, username, password, props) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(
        (userCredentials)=>{
        if(userCredentials.user){
          userCredentials.user.updateProfile({
            displayName: this.state.user.displayName
          })
        }},
        function () {
          displayOKAlert('Success!', 'Your account has been created'),
            props.navigation.replace('Login')
          firebase.auth().signOut().then(function () {
            console.log('User has been signed out')
          }).catch(function (err) {
            console.log('An error has occured in createUserAccount signOut: ',
              err,
              '\nF:', fullname,
              '\nU:', username,
              '| P:', password);
          })
        }).catch(function (err) {
          displayOKAlert('Oh no!', (err + "").substring(7))
          console.log('An error has occured in createUserAccount createUserWithEmailAndPassword: ',
            err,
            '\nF:', fullname,
            '\nU:', username,
            '| P:', password);
        })
    this.clearTextInputs()
  }
//uri: this.state.user.avatar
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}> 
          <Image source={{uri: this.state.avatar}} style={styles.avatar} />
          <Ionicons name="ios-add" size={40} color="aFFF"
            style={{ marginTop: 6, marginLeft: 2 }}>
          </Ionicons>
        </TouchableOpacity>
        <TextInput
          style={[styles.textField, styles.fullName]}
          placeholder='Full Name'
          onChangeText={this.handleFullName}
          value={this.state.fullName}
        />
        <TextInput
          style={[styles.textField, styles.email]}
          placeholder='Email'
          onChangeText={this.handleEmail}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={styles.textField}
          placeholder='Password (At least 6 characters)'
          onChangeText={this.handlePassword}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          this.createUserAccount(this.state.fullName, this.state.username, this.state.password, this.props)
        }}>
          <Text style={styles.text}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1E2E6"
    
  },
  avatarPlaceholder: {
    borderRadius: 60,
    width: 120,
    height: 120,
    backgroundColor: "#E1E2E6",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  fullName: {
    marginBottom: 30
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
})