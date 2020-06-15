import React, { useState } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { Ionicons } from '@expo/vector-icons';
import { View, Button, Text, StyleSheet, Platform, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import UserPermission from '../utilities/UserPermission';
import EditProfileScreen from '../screens/EditProfileScreen';



class ProfileScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        avatar: "",
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
    };

    handlePickAvatar = async () => {
        UserPermission.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (!result.cancelled) {
            this.setState({ avatar: result.uri })
        }
    };

    render() {
        return (
            <View>
                <View><ImageBackground style={styles.header} source={require('../components/img/headerbg.jpg')} /></View>
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                    <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
                    <Ionicons name="ios-add" size={30} color="#aFFF"
                        style={{ marginTop: 6, marginLeft: 2 }}>
                    </Ionicons>
                </TouchableOpacity>
                <Text style={styles.name}>Name</Text>
                <Text style={styles.info}>Title</Text>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.title}>Email Address: </Text>
                        <Text style={styles.email}>{this.state.email}</Text>
                        <Text style={styles.title}>Phone Number: </Text>
                        <Text style={styles.description}>#</Text>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Edit')}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle2} >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 250,
    },
    switch: {
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        marginTop: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        marginTop: 30,
        fontSize: 17,
        color: "black",
        fontWeight: '600',
    },
    buttonStyle: {
        justifyContent: 'center',
        width: 100,
        height: 50,
        backgroundColor: 'pink',
        borderRadius: 30,
        marginBottom: 5
    },
    buttonStyle2: {
        justifyContent: 'center',
        width: 80,
        height: 50,
        backgroundColor: 'pink',
        borderRadius: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 30
    },
    avatarPlaceholder: {
        borderRadius: 100,
        width: 120,
        height: 120,
        backgroundColor: "#E1E2E6",
        marginTop: 60,
        marginBottom: 10,
        justifyContent: "center",
        alignSelf: 'center',
        alignItems: "center",
        position: 'absolute',
    },
    email: {
        fontStyle: "italic",
        fontSize: 15,
        color: "#00BFFF",
        marginTop: 10
    },
    body: {
        marginTop: 0,
        height: '100%',
        backgroundColor: "white",
    },
    bodyContent: {
        alignItems: 'center',
    },
    name: {
        fontSize: 23,
        color: "white",
        fontWeight: '600',
        marginTop: 185,
        position: 'absolute',
        alignSelf: 'center',
    },
    info: {
        fontSize: 14,
        color: "white",
        fontWeight: '600',
        marginTop: 220,
        position: 'absolute',
        alignSelf: 'center',
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },

});

ProfileScreen.navigationOptions = navigationdata => {
    return {
        headerTitle: 'Profile',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navigationdata.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),

    }
};

export default ProfileScreen;