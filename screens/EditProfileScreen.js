import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, Platform, TextInput, Icon, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
//import { useSelector, useDispatch } from 'react-redux'
//import {HeaderButtons, Item } from 'react-navigation-header-buttons';
//import CustomHeaderButton from '../components/CustomHeaderButton';

const updateInfo = (name, title, number) => {
    return {
        profileData: {
            name, title, number
        }
    }
}


const EditProfileScreen = props => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');

    //const userId = props.navigation.getParam('userId');
    const saveHandler = useCallback(() => {
        console.log('Saving....')
    });

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
                        onChangeText={text => setName(text)}>
                    </TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}>
                    </TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={number}
                        onChangeText={text => setNumber(text)}>
                    </TextInput>
                </View>
            </View>
        </ScrollView>
    );
};

EditProfileScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('save');

    return {
        headerTitle: 'Edit Screen',
        headerRight:
            () => (
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
    },

});

export default EditProfileScreen;