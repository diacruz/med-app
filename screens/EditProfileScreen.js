import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, Platform, TextInput, Icon, TouchableOpacity, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import * as UserProfileActions from '../store/actions/userProfile';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase'

const EditProfileScreen = props => {

    const user = firebase.auth().currentUser; 
   
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const saveHandler = () => {
        user.updateProfile({
            displayName: "Jane Q. User",
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });
    props.navigation.goBack();
    }

    useEffect(() => {
        props.navigation.setParams({save: saveHandler});
    }, []);


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                        selectTextOnFocus={true}>
                    </TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                            selectTextOnFocus={true}>
                    </TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={number}
                        onChangeText={text => setNumber(text)}
                        selectTextOnFocus={true}>
                    </TextInput>
                </View>
                <View style={styles.switchStyle}>
                    <Text style={styles.label}> Public / Private</Text>
                    <Switch value={isVisible} onValueChange={newValue => setIsVisible(newValue)}></Switch>
                </View>
            </View>
        </ScrollView>
    );
};

EditProfileScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('save');

    return {
        headerTitle: 'Edit Screen',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={saveFn}
                />
            </HeaderButtons>
        ),

    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    container: {
        marginTop: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    buttonStyle2: {
        flex: 1,
        justifyContent: 'center',
        width: 80,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 50,
        justifyContent: "center"
    },
    switchStyle: {
        flex: 1,
        marginTop: 20,
        justifyContent: "center"
    }

});

export default EditProfileScreen;