import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import Firebase from '../backend/firebase'
import CategoryGridTile from '../components/CategoryGridTile';
//react-redux
import { useSelector, useDispatch } from 'react-redux';




const SubCategoriesScreen = props => {

  const categoryId = props.navigation.getParam('categoryId');
  const selectedSubCategories = useSelector(state =>
    state.categoriesContent.categoriesContent.filter(prod => prod.subId === categoryId)
  );

  const selectSubCategoryHandler = (id, title) => {
    //onSelect func name triggers on component
    let isChatroom = id === 'c8-1'
    let isCME = id === 'c8-2'
  
    if (isChatroom) {
      props.navigation.navigate('Chatroom', { name: firebase.auth().currentUser.email });
    }
    else if (isCME) {
      props.navigation.navigate('CME', { name: firebase.auth().currentUser.email });
    }
    else {
      props.navigation.navigate({
        routeName: 'CatContent',
        params: {
          CatContentId: id,
          subcategoryTitle : title
        }
      });
    }
  };

  const displayOKAlert =(title, message) => {
    Alert.alert(
      title,
      message
    );
  }
  
  /**
   * Deletes all messages from the database. 
   */
  
  const deleteAllMessages = () =>{
    firebase.database().ref('userCount').on('value', function (snapshot) {
      if (snapshot.val().count == 0) {
        firebase.database().ref('messages').remove();
      }
    });
  }
  
  /**
   * Signs a user out. This also takes care of the decrementing of userCount, 
   * the removal of the username from the onlineUsers list, and of the message
   * deletion if the user signing out is the last user that's signed in.
   */
  
  const signOut = useCallback(() =>{
    let signOutUser = Firebase.shared.userEmail
    firebase.auth().signOut().then(function () {
      Firebase.shared.setUserCount = -1;
      Firebase.shared.removeOnlineUser(signOutUser)
      firebase.database().ref('userCount').on('value', function (snapshot) {
        if (snapshot.val().count <= 0) {
          () =>{
            deleteAllMessages
          }
        }
      })
    props.navigation.navigate('Login')

    }).catch(function (err) {
      displayOKAlert('Oh no!', 'Sign out failed: ' + err)
      console.log(err)
    });
  },[]);

  useEffect(() =>{
    props.navigation.setParams({ Out: signOut });
  }, [signOut]);

  return (
    <FlatList
      data={selectedSubCategories}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={itemData =>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            selectSubCategoryHandler(itemData.item.id,itemData.item.title)
          }}
        />
      }
    />
  );
};

SubCategoriesScreen.navigationOptions = navigationdata => {
  const catTitle = navigationdata.navigation.getParam('categoryTitle');
  const outFn = navigationdata.navigation.getParam('Out');
  console.log(catTitle)
  if (catTitle === 'Chatroom & CME') {
    return {
      headerTitle: catTitle,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#CD5C5C',
      headerRight:(<Button title='Sign out' onPress={outFn} 
      />)
    }
  }
  return {
    headerTitle: catTitle,
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: '#CD5C5C',
  }
}
export default SubCategoriesScreen;
