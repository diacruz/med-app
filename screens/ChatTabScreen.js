import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Platform, FlatList, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Chat from '../components/Chat';
import Chatroom from '../screens/ChatroomScreen';
import * as firebase from 'firebase'
import 'firebase/firestore';
import Firebase from '../backend/firebase'
import Colors from '../constants/Colors';
//import {HeaderButtons, Item } from 'react-navigation-header-buttons';
//import CustomHeaderButton from '../components/CustomHeaderButton';

class ChatTabScreen extends Component {
    constructor(props) {
        super(props)        
    }
    
    render() {
        
        return (
            <View style={styles.screen}>
                <Chat navigation={this.props.navigation} ></Chat>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
        paddingVertical: 5,
        backgroundColor: Colors.androidCustomWhite
    },
    buttons: {
        flex: 1,
        height: 2000
    },
    sep: {
        borderBottomColor: Colors.androidCustomWhite,
        borderBottomWidth: 15
    }
});


ChatTabScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Chats',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
                <Item title='Refresh'onPress ={() => {

                }}/>
            </HeaderButtons>
        ),

    }
};

export default ChatTabScreen;