import React from 'react';
import { View, Text, Platform } from 'react-native';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const AdminPanelScreen = (props) => {
    return (<Text>hello from admin panel</Text>)
}



AdminPanelScreen.navigationOptions = navigationdata => {
    return {
        headerTitle: "Admin Panel",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navigationdata.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight:
            () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='ADD' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                           navigationdata.navigation.navigate('EditCatContent');
                        }}
                    />
                </HeaderButtons>
            ),
    }
}

export default AdminPanelScreen;