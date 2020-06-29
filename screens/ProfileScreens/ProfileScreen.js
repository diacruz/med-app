import React, { useState, Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    TouchableNativeFeedback
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


const ProfileScreen = props => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [avatar, setAvatar] = useState('');
    const [buttonColor, setButtonColor] = useState('red');
    const showDefault = useState(false);

    const uid = firebase.auth().currentUser.uid
    const db = firebase.firestore()

    const userRef = db.collection('users').doc(uid)

    const observer = userRef.onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot}`);
        userRef.get().then(doc => {
            setName(doc.data().name);
            setEmail(doc.data().email);
            setTitle(doc.data().title);
            setNumber(doc.data().number);
        })
      }, err => {
        console.log(`Encountered error: ${err}`);
      });


    const handlePickAvatar = async () => {
        UserPermission.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (!result.cancelled) {
            setAvatar(result.uri)
        }
    };

    /*
        componentDidMount() {
            const { email, displayName } = firebase.auth().currentUser;
            this.setState({ email, displayName });
        };
    */
    const onButtonPress = () => {
        if (buttonColor === 'red') {
            setButtonColor("#34FFB9");
        }

        else {
            setButtonColor("red");
        }
    }

    const handleSignOut = () => {
        new SignOut().signOut(props)
    }

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    var image = showDefault ? require('../../components/img/default-profile-pic.jpg') : { uri: avatar };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.responsiveBox}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image source={image} style={styles.avatar} resizeMode="cover"></Image>
                        </View>
                        <TouchableCmp onPress={onButtonPress}>
                            <View style={styles.active} backgroundColor={buttonColor}></View>
                        </TouchableCmp>
                        <View style={styles.add}>
                            <Ionicons name={Platform.OS === 'android' ? 'md-add' : 'ios-add'} size={30} color="#DFD8C8" style={{ marginTop: 0, marginLeft: 2 }} onPress={handlePickAvatar}></Ionicons>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 20, fontWeight: "bold" }]}>{name}</Text>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 16 }]}>{title}</Text>
                    </View>

                    <View style={styles.statusContainer}>
                        <View style={styles.status}>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <MaterialCommunityIcons name="emoticon-happy-outline" size={20}></MaterialCommunityIcons>
                                <Text>Set Status</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.status}>
                            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => props.navigation.navigate({ routeName: 'Edit', params: { userID: uid } })}>
                                <MaterialIcons name="edit" size={20}></MaterialIcons>
                                <Text>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.status}>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <MaterialIcons name="more-horiz" size={20}></MaterialIcons>
                                <Text>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={[styles.detailContainer]}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name="email" size={20}></MaterialIcons>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={[styles.text, { fontSize: 16 }]}>Email Address: </Text>
                            <Text style={[styles.text, styles.subText]}>{email}</Text>
                        </View>
                    </View>
                    <View style={[styles.detailContainer]}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name="local-phone" size={20}></MaterialIcons>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={[styles.text, { fontSize: 16 }]}>Phone Number: </Text>
                            <Text style={[styles.text, styles.subText]}>{number}</Text>
                        </View>
                    </View>
                    <View style={[styles.detailContainer]}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name="certificate" size={20}></MaterialCommunityIcons>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={[styles.text, { fontSize: 16 }]}>Certifications:</Text>
                            <Text style={[styles.text, styles.subText]}
                                onPress={() => props.navigation.navigate('CME')}> Show All {'>'} </Text>
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
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    responsiveBox: {
        height: "100%",
        width: "100%",
        flexDirection: "column"
    },
    text: {
        fontFamily: "open-sans",
        color: "#52575D",
    },
    avatar: {
        flex: 1,
        width: null,
        height: null,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 80,
        overflow: "hidden",
        marginTop: 5,
    },
    active: {
        position: "absolute",
        bottom: 20,
        left: 5,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        right: 8,
        bottom: 13,
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 15
    },
    detailContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 65,
        alignSelf: "center",
        marginTop: 15,
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
        marginBottom: 10,
        width: 270,
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
        fontSize: 14,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
        marginTop: 5
    },
    buttonStyle: {
        marginTop: 30,
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