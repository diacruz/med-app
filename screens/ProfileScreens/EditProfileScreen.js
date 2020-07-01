import React, { useState, useEffect, useCallback } from 'react';
import { Image, Alert, View, ScrollView, Button, Text, StyleSheet, Platform, TextInput, Icon, TouchableOpacity, Switch } from 'react-native';
import { HelperText, HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as firebase from 'firebase';
//import PhoneInput from "react-native-phone-input";

const EditProfileScreen = props => {

    const uid = props.navigation.getParam('userID');
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);

    const name = props.navigation.getParam('name');
    const title = props.navigation.getParam('title');
    const number = props.navigation.getParam('number');

    const [displayName, setDisplayName] = useState(name);
    const [jobTitle, setJobTitle] = useState(title);
    const [numberType, setNumberType] = useState(number);

    const [errorName, setErrorName] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorNumber, setErrorNumber] = useState('');
    //const [status, setStatus] = useState('');

    const [avatar, setAvatar] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const showDefault = useState(false);

    const [isName, setIsName] = useState(false);
    const [isTitle, setIsTitle] = useState(false);
    const [isNumber, setIsNumber] = useState(false);

    async function addInfo() {
        if (errorName || errorTitle || errorNumber) {
            alert("Invalid input")
        } else {
            if (displayName != "") {
                await userRef.update({
                    name: displayName,
                });
            }
            if (jobTitle != "") {
                await userRef.update({
                    title: jobTitle,
                });
            }
            if (numberType != "") {
                await userRef.update({
                    number: numberType,
                });
            }
            props.navigation.goBack();
        }
    };

    const normalizeInput = (value, previousValue) => {
        if (!value) return value;
        const currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;

        if (!previousValue || value.length > previousValue.length) {
            if (cvLength < 4) return currentValue;
            if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
        }
    };

    const handleNameChange = (value) => {
        setIsName(true)
        setDisplayName(value)
        if (!value) {
            setErrorName("Name field cannot be empty")
        } else {
            setErrorName(null)
        }
    }

    const handleTitleChange = (value) => {
        setIsTitle(true)
        setJobTitle(value)
        if (!value) {
            setErrorTitle("Title field cannot be empty")
        } else {
            setErrorTitle(null)
        }
    }
    const handleNumberChange = (value) => {
        setIsNumber(true)
        if (value === "") {
            setErrorNumber("Number field cannot be empty")
        }
        else if (value.length <= 13) {
            setErrorNumber("Invalid phone format. ex: (555) 555-5555")
        }
        else {
            setErrorNumber(null)
        }
        setNumberType(prevState => (normalizeInput(value, prevState.number)));
    };

    var image = showDefault ? require('../../components/img/default-profile-pic.jpg') : avatar;


    return (
        <View style={{ justifyContent: 'center', height: "100%" }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.profileImage, { marginLeft: 20 }]}>
                        <Image source={image} style={styles.avatar} resizeMode="cover"></Image>
                    </View>
                    <View style={[styles.buttonStyle, { flexDirection: 'column', marginLeft: 20 }]}>
                        <TouchableOpacity style={styles.buttonText}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Upload Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonText}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Delete Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={displayName}
                            placeholder="Please enter your name"
                            onChangeText={text => handleNameChange(text)}
                            selectTextOnFocus={true}
                            onFocus={() => setIsName(true)}>
                        </TextInput>
                        {!!errorName && (
                            <Text style={{ color: 'red' }}>
                                {errorName}
                            </Text>
                        )}
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Job Title</Text>
                        <TextInput
                            style={styles.input}
                            value={jobTitle}
                            placeholder="Please enter your title"
                            onChangeText={text => handleTitleChange(text)}
                            selectTextOnFocus={true}
                            onFocus={() => setIsTitle(true)}>
                        </TextInput>
                        {!!errorTitle && (
                            <Text style={{ color: 'red' }}>
                                {errorTitle}
                            </Text>
                        )}
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            maxLength={15}
                            keyboardType={'phone-pad'}
                            textContentType='telephoneNumber'
                            dataDetectorTypes='phoneNumber'
                            value={numberType}
                            placeholder="Please enter your phone number"
                            onChangeText={text => handleNumberChange(text)}
                            selectTextOnFocus={true}
                            onFocus={() => setIsNumber(true)}>
                        </TextInput>
                        {!!errorNumber && (
                            <Text style={{ color: 'red' }}>
                                {errorNumber}
                            </Text>
                        )}
                    </View>
                    <View style={styles.switchStyle}>
                        <Text style={styles.label}> Public / Private</Text>
                        <Switch value={isVisible} onValueChange={newValue => setIsVisible(newValue)}></Switch>
                    </View>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={() => addInfo()}>
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

EditProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Screen',
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
        marginTop: 10
    },
    formControl: {
        width: '100%',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 80,
        overflow: "hidden",
        marginTop: 10,
    },
    avatar: {
        flex: 1,
        width: null,
        height: null,
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
    },
    buttonImage: {
        borderColor: '#8e44ad',
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 3,
    },
    buttonStyle: {
        marginTop: 20,
        alignContent: "center",
        alignSelf: "center",
    },
    buttonSubmit: {
        top: "105%",
        alignContent: "center",
        alignSelf: "center",
        position: 'absolute'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
        width: 90,
    },
    buttonText: {
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
        padding: 10,
        width: 150,
        marginTop: 10
    },

});

export default EditProfileScreen;