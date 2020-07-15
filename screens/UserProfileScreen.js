import React, { useState, useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
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
    Dimensions,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

const UserProfileScreen = props => {

    const [loading, setLoading] = useState(true);

    const uid = props.navigation.getParam('ID');
    var data = '';

    const db = firebase.database()

    const userRef = db.ref('users/' + uid + '/profile');
    userRef.on('value', function (snapshot) {
        data = snapshot.val();
    });


    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const [buttonColor, setButtonColor] = useState('');

    useEffect(() => {
        if (data.status === "Active") {
            setButtonColor("#34FFB9");
        }
        else if (data.status === "Busy") {
            setButtonColor("red");
        }
    });

    var image = data.avatar !== '' ? { uri: data.avatar } : require('../components/img/default-profile-pic.jpg');

    if (loading) {
        <ActivityIndicator size="large"></ActivityIndicator>
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../components/img/colors3.jpeg')}
                style={styles.background}>
                <SafeAreaView>
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
                                <View style={styles.infoText}>
                                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, fontWeight: "bold" }]}>{data.name}</Text>
                                </View>
                                <View style={styles.infoText}>
                                    <Text style={[styles.text, { fontSize: 16 }]}>{data.title}</Text>
                                </View>
                                <View style={styles.infoText}>
                                    <Text style={[styles.text, { fontSize: 16 }]}>Status: {data.status}</Text>
                                </View>
                            </View>
                            <View style={[styles.detailContainer]}>
                                <View style={styles.iconBox}>
                                    <MaterialIcons name="email" size={20}></MaterialIcons>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.text}>Email Address: </Text>
                                    <Text style={[styles.text, styles.subText]}>{data.email}</Text>
                                </View>
                            </View>
                            <View style={[styles.detailContainer]}>
                                <View style={styles.iconBox}>
                                    <MaterialIcons name="local-phone" size={20}></MaterialIcons>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.text}>Phone Number: </Text>
                                    <Text style={[styles.text, styles.subText]}>{data.number}</Text>
                                </View>
                            </View>
                            <View style={styles.buttonStyle}>
                                <TouchableOpacity >
                                    <Text style={styles.button}>Send Message</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

let screenHeight = Math.round(Dimensions.get('window').height);
let screenWidth = Math.round(Dimensions.get('window').width);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    responsiveBox: {
        width: screenWidth,
        height: screenHeight
    },
    background: {
        width: '100%',
        height: '100%',

    },
    text: {
        fontFamily: "open-sans",
        color: "black",
        fontSize: 0.043 * screenWidth
    },
    avatar: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    profileImage: {
        width: screenWidth * 0.40,
        height: screenHeight * 0.23,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: "4%",
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: "white",
    },
    active: {
        position: "absolute",
        bottom: 20,
        left: 5,
        padding: 4,
        height: 25,
        width: 25,
        borderRadius: 15
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: "3%",
    },
    infoText: {
        marginBottom: "1%"
    },
    detailContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: screenHeight * 0.101,
        alignSelf: "center",
        marginTop: "4%",
        marginHorizontal: 25,
        backgroundColor: "whitesmoke",
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 12,
        opacity: 0.8
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
        marginTop: screenHeight * 0.050,
        alignContent: "center",
        alignSelf: "center",
    },
    button: {
        backgroundColor: "steelblue",
        borderColor: "cornflowerblue",
        borderWidth: 1,
        borderRadius: 10,
        color: 'white',
        fontSize: 0.038 * screenWidth,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 15,
        textAlign: 'center',
    }


});

UserProfileScreen.navigationOptions = navigationdata => {
    return {
        headerTitle: 'User Profile',
    }
};

export default UserProfileScreen;
