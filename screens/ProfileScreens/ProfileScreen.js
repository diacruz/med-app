import React, { useState, Component, useEffect, useCallback } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import UserPermission from '../../utilities/UserPermission';
import EditProfileScreen from './EditProfileScreen';
import Colors from '../../constants/Colors';
import CME from '../CMEScreen'
import SignOut from '../SignOut';
import Login from '../LoginScreen';
import ModalDropdown from 'react-native-modal-dropdown';


const ProfileScreen = props => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [certs, setCerts] = useState([])
    const [avatar, setAvatar] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [loading, setLoading] = useState(true);

    const [buttonColor, setButtonColor] = useState('red');
    const [selected, setSelected] = useState(false);

    const uid = firebase.auth().currentUser.uid
    const db = firebase.database()

    const userRef = db.ref('users/' + uid + '/profile')

    useEffect(() => {
        setLoading(true)
        userRef.on('value', function (snapshot) {
            console.log(snapshot.val())
            const { name, email, avatar, title, certs, number } = snapshot.val();
            setName(name);
            setEmail(email);
            setAvatar(avatar)
            setTitle(title);
            setNumber(number);
            setCerts(certs)
        }, err => {
            console.log(`Encountered error: ${err}`);
        })
        setLoading(false)
    }, []);


    const handleSignOut = () => {
        setLoading(true)
        new SignOut().signOut(props)
        setLoading(false)
    }

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    useEffect(() => {
        var cmeRef = firebase.database().ref('userCmes/userId:' + uid)
        cmeRef.orderByChild("cmes").on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                childData.key = childSnapshot.key;
                setCerts(childData)
            });
        })
    }, [])

    const handleCerts = () => {
        userRef.update({
            certs: certs,
        });
        props.navigation.navigate('CME')
    }

    const menuArray = ["Turn On", "Turn Off"]

    useEffect(() => {
        if(selected === "Turn On"){
        setButtonColor("#34FFB9");

        userRef.update({
            status: 'Active',
        });
    }
    }, [selected])

    useEffect(() => {
        if(selected === "Turn Off"){
        setButtonColor("red");

        userRef.update({
            status: 'Busy',
        });
    }
    }, [selected])


    var image = avatar ? { uri: avatar } : require('../../components/img/default-profile-pic.jpg');

    return (
        <View style={{ flex: 1 }}>
            {(loading) ? <ActivityIndicator size="large"></ActivityIndicator> :
                <SafeAreaView style={styles.container}>
                    <View style={styles.responsiveBox}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ alignSelf: "center" }}>
                                <View style={styles.profileImage}>
                                    <Image source={image} style={styles.avatar} resizeMode="cover"></Image>
                                </View>
                                <TouchableCmp>
                                    <View style={styles.active} backgroundColor={buttonColor}></View>
                                </TouchableCmp>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={[styles.text, { fontWeight: "200", fontSize: 20, fontWeight: "bold" }]}>{name}</Text>
                                <Text style={[styles.text, { fontSize: 16 }]}>{title}</Text>
                            </View>
                            <View style={styles.statusContainer}>
                                <View style={styles.status}>
                                    <ModalDropdown
                                        options={menuArray}
                                        dropdownStyle={{ height: 40 * menuArray.length, alignItems: 'center' }}
                                        dropdownTextStyle={{ fontSize: 0.04 * screenWidth, color: 'black' }}
                                        textStyle={{ fontSize: 0.04 * screenWidth, color: 'black', alignSelf: "center" }}
                                        defaultValue=''
                                        onSelect={(index,value)=>{setSelected(value)}}>
                                        <View style={{ alignItems: "center" }}>
                                            <MaterialCommunityIcons name="emoticon-happy-outline" size={20}></MaterialCommunityIcons>
                                            <Text style={{ fontSize: 0.04 * screenWidth }}>Active Status</Text>
                                        </View>
                                    </ModalDropdown>
                                </View>
                                <View style={styles.status}>
                                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => props.navigation.navigate({
                                        routeName: 'Edit', params: { userID: uid, name: name, title: title, number: number, avatar: avatar }
                                    })}>
                                        <MaterialIcons name="edit" size={20}></MaterialIcons>
                                        <Text style={{ fontSize: 0.04 * screenWidth }}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.status}>
                                    <TouchableOpacity style={{ alignItems: "center" }} 
                                    onPress={() => props.navigation.navigate({routeName: 'Calendar'})}>
                                        <MaterialCommunityIcons name="calendar-heart" size={20}></MaterialCommunityIcons>
                                        <Text style={{ fontSize: 0.04 * screenWidth }}>Calendar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={[styles.detailContainer]}>
                                <View style={styles.iconBox}>
                                    <MaterialIcons name="email" size={20}></MaterialIcons>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.text}>Email Address: </Text>
                                    <Text style={[styles.text, styles.subText]}>{email}</Text>
                                </View>
                            </View>
                            <View style={[styles.detailContainer]}>
                                <View style={styles.iconBox}>
                                    <MaterialIcons name="local-phone" size={20}></MaterialIcons>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.text}>Phone Number: </Text>
                                    <Text style={[styles.text, styles.subText]}>{number}</Text>
                                </View>
                            </View>
                            <View style={[styles.detailContainer]}>
                                <View style={styles.iconBox}>
                                    <MaterialCommunityIcons name="certificate" size={20}></MaterialCommunityIcons>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.text}>Certifications:</Text>
                                    <Text style={[styles.text, styles.subText]}
                                        onPress={handleCerts}> Show All {'>'} </Text>
                                </View>
                            </View>
                            <View style={styles.buttonStyle}>
                                <TouchableOpacity onPress={handleSignOut}>
                                    <Text style={styles.button}>LOGOUT</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            }
        </View>
    );
}

export default ProfileScreen;

let screenHeight = Math.round(Dimensions.get('screen').height);
let screenWidth = Math.round(Dimensions.get('screen').width);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    responsiveBox: {
        width: screenWidth,
        height: screenHeight,
    },
    backgroundimage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        fontFamily: "open-sans",
        color: "#52575D",
        fontSize: 0.043 * screenWidth
    },
    avatar: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    profileImage: {
        width: screenWidth * 0.30,
        height: screenHeight * 0.226,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: "2%",
        aspectRatio: 1
    },
    active: {
        position: "absolute",
        bottom: 18,
        left: "5%",
        padding: "7%",
        borderRadius: 15
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: "2%",
        marginBottom: "3%"
    },
    detailContainer: {
        flexDirection: "row",
        alignItems: "center",
        maxHeight: "20%",
        minHeight: "10%",
        alignSelf: "center",
        marginTop: "4%",
        marginHorizontal: 25,
        backgroundColor: "white",
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    status: {
        flex: 1,
        alignItems: "center",
    },
    statusContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: "1%",
        width: "82%",
    },
    iconBox: {
        flex: 0.3,
        alignItems: "flex-end"
    },
    detailBox: {
        flex: 1,
        alignItems: "center",
        borderColor: "silver",
        borderLeftWidth: 1,
        marginLeft: 40
    },
    subText: {
        fontSize: 0.038 * screenWidth,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
        marginTop: 5,
    },
    buttonStyle: {
        marginTop: screenHeight * 0.035,
        alignContent: "center",
        alignSelf: "center"
    },
    button: {
        backgroundColor: Colors.primaryColor,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        color: 'white',
        fontSize: 0.038 * screenWidth,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
    }
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