import { PROFILE_FETCH, PROFILE_EDIT } from './types';
import * as firebase from 'firebase';
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

export const onSaveChanges = (userpic, name_profile, email, phone, gender) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .update({
        userpic,
        name_profile,
        email,
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