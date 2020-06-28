export const SET_PROFILE = 'SET_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
import * as firebase from 'firebase';
import { sub } from 'react-native-reanimated';

export const fetchUserProfile = () => {

    return async dispatch => {
        // you can access here any async code!
        const response = await fetch('https://pedemapp-6ee7f.firebaseio.com/profile.json', {
        });
        const userData = await response.json();
        const userProfileFireBaseData = [];

        for (const key in userData) {
            userProfileFireBaseData.push(new Profile(
                key,
                userData[key].subId,
                userData[key].name,
                userData[key].email,
                userData[key].number,
                userData[key].title,
                userData[key].avatar,
                userData[key].status,
                userData[key].certs,
                userData[key].isVisible,
            ));
        }

        dispatch({ type: SET_PROFILE, userProfileContent: userProfileFireBaseData })
    };
};

export const createProfile = (subId, name, email, number, title, avatar, status, certs, isVisible) => {
    return async dispatch => {
        // you can access here any async code!
        const response = await fetch('https://pedemapp-6ee7f.firebaseio.com/profile.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subId,
                name,
                email,
                number,
                title,
                avatar,
                status,
                certs,
                isVisible
            })
        });

        const userData = await response.json();
        console.log(userData);
       const profileId = firebase.auth().currentUser.uid

       console.log('Store: ' + profileId)

        dispatch({
            type: CREATE_PROFILE,
            userProfileData: {
                id: userData.id,
                subId: profileId,
                name: name,
                email: email,
                number: number,
                title: title,
                avatar: avatar,
                status: status,
                certs: certs,
                isVisible: isVisible
            }
        });
    };
};

export const updateProfile = (id, name, number, title, avatar, status, certs, isVisible) => {
    return async dispatch => {
        await fetch(`https://pedemapp-6ee7f.firebaseio.com/profile/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    number,
                    title,
                    avatar,
                    status,
                    certs,
                    isVisible
                })
            });

        dispatch({
            type: UPDATE_PROFILE,
            userProfileId: id,
            userProfileData: {
                name: name,
                number: number,
                title: title,
                avatar: avatar,
                status: status,
                certs: certs,
                isVisible: isVisible
            }
        });
    };
};

export const deleteProfile = (userProfileId) => {
    return async dispatch => {
        const response = await fetch(`https://pedemapp-6ee7f.firebaseio.com/profile/${userProfileId}.json`, {
            method: 'DELETE',
        });
        dispatch({ type: DELETE_PROFILE, userProfileId: userProfileId });
    }
};


