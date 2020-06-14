import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import CategoriesScreen from '../screens/CategoriesScreen';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';
import CatContentScreen from '../screens/CatContentScreen';
import ChatroomScreen from '../screens/ChatroomScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CMEScreen from '../screens/CMEScreen';
import SearchScreen from '../screens/SearchScreen';
import AdminCategoriesScreen from '../screens/AdminScreens/AdminCategoriesScreen';
import EditCatContentScreen from '../screens/AdminScreens/EditCatContentScreen';
import AdminSubCategoriesScreen from '../screens/AdminScreens/AdminSubCategoriesScreen';
import Colors from '../constants/Colors';

const CatNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    SubCategories: {
      screen: SubCategoriesScreen
    },
    CatContent: {
      screen: CatContentScreen
    },
    Chatroom: {
      screen: ChatroomScreen
    },
    CME: {
      screen: CMEScreen
    },
    Login: {
      screen: LoginScreen
    },
    SignUp: {
      screen: SignUpScreen
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
  }
);

const AdminNavigator = createStackNavigator({

  AdminCategories: AdminCategoriesScreen,
  EditCatContent: EditCatContentScreen,
  AdminSubCategories: AdminSubCategoriesScreen,
  CatContent: CatContentScreen
},
  {
      navigationOptions: {
          drawerIcon: drawerConfig =>(
              <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={drawerConfig.tintColor}
          />
          )
             
      },
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }
  }
);

const PemNavigator = createDrawerNavigator({
  Categories: CatNavigator,
  Admin: AdminNavigator,
},
  {
      contentOptions: {
          activeTinColor: Colors.primary
      }
  }
);


export default createAppContainer(PemNavigator);