import { PROFILE_FETCH, PROFILE_EDIT } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const fetchProfile = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .on('value', snapshot => {
        dispatch({
          type: PROFILE_FETCH,
          payload: snapshot.val()
        });
      });
  };
};

export const onSaveChanges = (name_profile, email, title, phone, gender) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .update({
        name_profile,
        email,
        title,
        phone,
        gender
      })
      .then(() => {
        dispatch({
          type: PROFILE_EDIT
        });
        Actions.profile();
      });
  };
};