import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, Platform, TextInput, Icon, TouchableOpacity, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as firebase from 'firebase'

const EditProfileScreen = props => {

    const uid = props.navigation.getParam('userID');
    const db = firebase.firestore();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);


    const userRef = db.collection('users').doc(uid);
    // userRef.update(data);

    async function addInfo() {
        await userRef.update({
            name: name,
            title: title,
            number: number
        });
        props.navigation.goBack();
    }


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                        selectTextOnFocus={true}
                        returnKeyType="next">
                    </TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                        selectTextOnFocus={true}
                        returnKeyType="next">
                    </TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={number}
                        onChangeText={text => setNumber(text)}
                        selectTextOnFocus={true}
                        returnKeyType="next">
                    </TextInput>
                </View>
                <View style={styles.switchStyle}>
                    <Text style={styles.label}> Public / Private</Text>
                    <Switch value={isVisible} onValueChange={newValue => setIsVisible(newValue)}></Switch>
                </View>
                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={() => addInfo()}>
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

EditProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Screen',
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
    },
    buttonStyle: {
        marginTop: 50,
        alignContent: "center",
        alignSelf: "center"
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
    }

});

export default EditProfileScreen;