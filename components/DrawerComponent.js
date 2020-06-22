import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, SafeAreaView, ScrollView, View, Image, Button, StyleSheet } from 'react-native';
import { DrawerItems } from "react-navigation-drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import SignOut from '../screens/SignOut'

const DrawerComponent = (props) => {
return(
    <View style={styles.container} >
        <SafeAreaView>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
        <TouchableOpacity style={styles.touchable}
            onPress={() =>
                Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                        { text: 'Cancel', onPress: () => { return null } },
                        {
                            text: 'Confirm', onPress: () => {
                                new SignOut().signOut(props)
                            }
                        },
                    ],
                    { cancelable: false }
                )
            }>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <MaterialCommunityIcons name="exit-to-app" size={23} style={{color: Colors.primary}}></MaterialCommunityIcons>
                <Text style={[styles.signText, {color: Colors.primary}]} > Logout</Text>
            </View>
        </TouchableOpacity>

    </View>
)
};

const styles = StyleSheet.create({
    signText: {
        fontWeight: "bold",
        fontSize: 15
    },
    touchable: {
        position: 'absolute',
        bottom: 0,
        margin: 10,
    },
    container: {
        flex: 1,
    }

});

export default DrawerComponent;