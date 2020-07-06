import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback, Image} from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import Firebase from '../backend/firebase';
import { testMatrix } from '../node_modules/firebase-functions/lib/providers/testLab';


const Chat = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    let lastMessage = "default text"
    let lastUsername = "aaa@aaaa"
    
    return (
        <View> 
            <TouchableCmp onPress={ function () {
                props.navigation.navigate('Chatroom', { name: firebase.auth().currentUser.email })
            }}>
                <View>
                    <View style={styles.chatTile}>
                        <Image style={styles.logo}
                            source={require('./img/globe.jpg')}
                        />
                        <Text style={styles.textStyle}>   Global Chat</Text>
                        
                    </View>
                </View>
            </TouchableCmp>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
    },
    chatTile: {
        flexDirection: "row",
    },
    textStyle: {
        fontSize: 30,
    }
})
export default Chat;