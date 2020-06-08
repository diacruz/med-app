import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import CategoriesScreen from './CategoriesScreen';
import { useSelector, useDispatch } from 'react-redux';

const CatContentScreen = props => {
  const categoryId = props.navigation.getParam('CatContentId');
  const selectedSubCategories = useSelector(state =>
    state.categoriesContent.categoriesContent.find(prod => prod.id === categoryId)
  );
  return (
    <ScrollView style = {styles.screen}>
      
      <Text style={styles.header}>EVALUATION</Text>
      <Text style={styles.content}> {selectedSubCategories.evaluation} </Text>
      <Text style={styles.header}>MANAGEMENT</Text>
      <Text style={styles.content}>{selectedSubCategories.management}</Text>
      <Text style={styles.header}>MEDICATION</Text>
      <Text style={styles.content}>{selectedSubCategories.medication}</Text>
      <Text style={styles.header}>SYMPTOMS</Text>
      <Text style={styles.content}>{selectedSubCategories.symptoms}</Text>
      <Text style={styles.header}>REFERENCES</Text>
      <Text style={styles.content}>{selectedSubCategories.references}</Text>
    </ScrollView>
  );

};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    width: 250,
    borderBottomColor: 'black',
    textAlign: 'center',
    color: 'red',
    paddingBottom: 10,
    paddingLeft: 50
  },
  content: {
    paddingBottom: 15
  }
});


CatContentScreen.navigationOptions = navigationdata => {
  const subcategoryTitle = navigationdata.navigation.getParam('subcategoryTitle');
  return {
    headerTitle: subcategoryTitle,
    headerTintColor: '#CD5C5C',
    headerStyle: {
      backgroundColor: 'white',
    }
  }
}

export default CatContentScreen;