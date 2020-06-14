import React from 'react';
import { FlatList, Platform } from 'react-native';
import CategoryGridTile from '../../components/CategoryGridTile';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// using react redux to acces data 
import { useSelector, useDispatch } from 'react-redux';


const AdminCategoriesScreen = (props) => {

  //getting  data from categories in redux store
  const categories = useSelector(state => state.categories.categories);

  //method to handle what category is selected
  const selectCategoryHandler = (id, title) => {
    props.navigation.navigate({ routeName: 'AdminSubCategories', params: { categoryId: id, categoryTitle: title } });
  };
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={itemData =>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          //onSelect func name triggers on component
          onSelect={() => { selectCategoryHandler(itemData.item.id, itemData.item.title) }}
        />
      }
    />
  );
}
AdminCategoriesScreen.navigationOptions = navigationdata => {
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

  }
}

export default AdminCategoriesScreen;