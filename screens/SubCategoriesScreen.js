import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import Firebase from '../backend/firebase'
import CategoryGridTile from '../components/CategoryGridTile';
//react-redux
import { useSelector } from 'react-redux';

const SubCategoriesScreen = props => {

  const categoryId = props.navigation.getParam('categoryId');
  const selectedSubCategories = useSelector(state =>
    state.categoriesContent.categoriesContent.filter(prod => prod.subId === categoryId)
  );

  const selectSubCategoryHandler = (id, title) => {
      props.navigation.navigate({
        routeName: 'CatContent',
        params: {
          subcategoryId: id,
          subcategoryTitle: title
        }
      });
  };
 
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
            selectSubCategoryHandler(itemData.item.id, itemData.item.title)
          }}
        />
      }
    />
  );
};

SubCategoriesScreen.navigationOptions = navigationdata => {
  const catTitle = navigationdata.navigation.getParam('categoryTitle');
  console.log(catTitle)
  return {
    headerTitle: catTitle,
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: '#CD5C5C',
  }
}
export default SubCategoriesScreen;
