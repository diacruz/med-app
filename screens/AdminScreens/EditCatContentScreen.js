import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as CatContentActions from '../../store/actions/catContent';

const EditCatContentScreen = props => {

    const categoryId = props.navigation.getParam('categoryId');
    const subCategoryId = props.navigation.getParam('subCatId');
    const editedSelectedSubCategories = useSelector(state =>
        state.categoriesContent.categoriesContent.find(prod => prod.id === subCategoryId)
    );
    const selectedCategory = useSelector(state =>
        state.categories.categories.find(prod => prod.id === categoryId)
    );

    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedSelectedSubCategories ? editedSelectedSubCategories.title : '');
    const [evaluation, setEvaluation] = useState(editedSelectedSubCategories ? editedSelectedSubCategories.evaluation : '');
    const [signs, setSigns] = useState(editedSelectedSubCategories ? editedSelectedSubCategories.signs : '');
    const [management, setManagement] = useState(editedSelectedSubCategories ? editedSelectedSubCategories.management : '');
    const [medications, setMedications] = useState(editedSelectedSubCategories ? editedSelectedSubCategories.medications : '');
    const [references, setReferences] = useState(editedSelectedSubCategories ? editedSelectedSubCategories.references : '');


    const submitHandler = useCallback(() => {
        if (editedSelectedSubCategories) {
            dispatch(CatContentActions.updateCatContent(subCategoryId, title, evaluation, signs, management, medications, references));
        }
        else {
            dispatch(CatContentActions.createCatContent(title, selectedCategory.color, selectedCategory.id, evaluation, signs, management, medications, references));
        }
        props.navigation.goBack();
    }, [dispatch, subCategoryId, selectedCategory.color, selectedCategory.id, title, evaluation, signs, management, medications, references, editedSelectedSubCategories]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);


    return (
        <ScrollView>
            <View syle={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.font}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.font}>Evaluation</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        value={evaluation}
                        onChangeText={text => setEvaluation(text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />

                </View>
                <View style={styles.formControl}>
                    <Text style={styles.font}>Signs</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true} value={signs}
                        onChangeText={text => setSigns(text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.font}> Management</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        value={management}
                        onChangeText={text => setManagement(text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.font}> Medications</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true} value={medications}
                        onChangeText={text => setMedications(text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.font}> References</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        value={references}
                        onChangeText={text => setReferences(text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditCatContentScreen.navigationOptions = navigationData => {
    const submitChanges = navigationData.navigation.getParam('submit')
    return {
        headerTitle:
            navigationData.navigation.getParam('subCatId')
                ? 'Edit Category'
                : 'Add Category',
        headerRight:
            () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={submitChanges}
                    />
                </HeaderButtons>
            ),
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,

    },
    formControl: {
        width: '100%',
        paddingHorizontal: 30,
    },
    font: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default EditCatContentScreen;