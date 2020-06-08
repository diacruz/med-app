import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

// using react redux to acces data 
import { useSelector, useDispatch } from 'react-redux';

const CategoriesScreen = props =>{

  //getting  data from categories in redux store
  const categories = useSelector(state => state.categories.categories);

  //method to handle what category is selected
  const selectCategoryHandler = (id, title) =>{

    if (title === 'Chatroom & CME') {
      if (firebase.auth().currentUser) {
        props.navigation.navigate({ routeName: 'SubCategories', params: { categoryId: id, categoryTitle: title } });
      } 
      else {
        props.navigation.navigate({ routeName: 'Login' })
      }
    } 
    else if (title === 'Search') {
      props.navigation.navigate({ routeName: 'Search', params: { categoryId: id}});
    } 
    else {
      props.navigation.navigate({ routeName: 'SubCategories', params: { categoryId: id, categoryTitle: title } });
    }
  };

  return(
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      numColumns ={2}
      renderItem={itemData =>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          //onSelect func name triggers on component
          onSelect={() => {selectCategoryHandler(itemData.item.id, itemData.item.title)}}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'

  },
  titles: {
    fontSize: 25,
    color: '#CD5C5C',
    textAlign: 'center'
  }
});



CategoriesScreen.navigationOptions = navigationdata => {
    return {
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navigationdata.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
  
    }
  }

export default CategoriesScreen;