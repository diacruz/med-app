import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

/**
 * The chatroom component is what takes care of showing the actual messages sent between users of the app.
 * Right now, it only shows the global chat, which should be changed to showcase a specific chat as it is passed
 * in the props. There are also some missing features described lower in the code.
 */


class Chatroom extends Component {
  static navigationOptions = {
    title: 'Chatroom',
  };


  constructor(props) {
    super(props)

    //this.signOut = this.signOut.bind(this)
    this.setOnlineUsersStr = this.setOnlineUsersStr.bind(this)
    this.displayOKAlert = this.displayOKAlert.bind(this)
  }

  state = {
    messages: [],
    onlineUsers: ''
  };

  /**
   * Displays an alert box. If forUsers is set to true, then it will have a refresh button as well, 
   * to refresh the list of online users it will be displaying. Otherwise, it will be a plain alert
   * box.
   * @param {string} title 
   * @param {string} message 
   * @param {boolean} forUsers 
   */
  displayOKAlert(title, message, forUsers) {
    if (forUsers) {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Refresh',
            onPress: () => {
              this.setOnlineUsersStr()
              this.displayOKAlert("Who\'s currently online", this.state.onlineUsers, true)
            }
          },
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        title,
        message
      );

    }
  }

  componentDidMount() {
    this.setOnlineUsersStr();
    this.props.navigation.setParams({
      headerRight: () => (
        <View>
          <Button
            style={styles.whosOnlineButton}
            title={"Who\'s online"}
            onPress={() => {
              this.setOnlineUsersStr()
              this.displayOKAlert(
                "Who\'s currently online",
                'Please tap \"Refresh\" to ensure the list is up to date\n\n' + this.state.onlineUsers,
                true
              )
            }}
          />
        </View>
      )
    })
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerRight: navigation.state.params && navigation.state.params.headerRight,
    };
  };

  /**
   * Sets the onlineUsers string. This is what will be passed to displayOKAlert.
   */
  setOnlineUsersStr() {
    //console.log('RUNNING SETONLINEUSERS')
    let userStr = ''
    firebase.database().ref('onlineUsers').on('value', function (snapshot) {
      let arr = snapshot.val().onlineUsers
      if (arr) {
        //console.log('ARR', arr)
        arr.forEach(element => {
          if (!userStr.includes(element)) {
            userStr += element + '\n'
          }
        });
      } else {
        //console.log('arr is undefined')
      }

    })
    this.setState({
      onlineUsers: userStr
    })
    //console.log('STATE IN SETONLINEUSERS', this.state.onlineUsers)
  }

  componentWillUnmount() {
    Firebase.shared.off();
  }

  Send() {
    Firebase.shared.send

  }
  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.uid,
    };
  }

  // The method onPress is supposed to show a user's profile when their avatar is pressed in the chat. 
  // Right now it does not happen because I was not able to successfully link it to the profile part of the program.
  onPress() {
    console.log("Avatar Pressed")
    //this.props.navigation.navigate('Chatroom', { name: firebase.auth().currentUser.email })
  }

  render() {
      // For the actual chat, we are using a library called GiftedChat (https://www.npmjs.com/package/react-native-gifted-chat), 
      // which has a lot of features out of the box, such as support for image and video, user avatar images, quick replies and
      // a bunch more.
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.shared.send}
        user={this.user}
        alwaysShowSend
        onPressAvatar={this.onPress}
      />
    );
  }
}

export default Chatroom;

const styles = StyleSheet.create({
  whosOnlineButton: {
    flex: 1,
    marginTop: 6
  }
})