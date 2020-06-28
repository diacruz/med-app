import { SET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE } from '../actions/userProfile';
import Profile from '../../models/profile';
import { PROFILES } from '../../data/profiledata';

const initialState = {
  userContent: PROFILES,
};

const userContentReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_PROFILE:
      return {
        userContent: action.userProfileContent
      };
    case CREATE_PROFILE:
      const newProfile = new Profile(
        action.userProfileData.id,
        action.userProfileData.subId,
        action.userProfileData.name,
        action.userProfileData.email,
        action.userProfileData.number,
        action.userProfileData.title,
        action.userProfileData.avatar,
        action.userProfileData.status,
        action.userProfileData.certs,
        action.userProfileData.isVisible,
      );
      return {
        ...state, 
        userContent: state.userContent.concat(newProfile),
      };

      case UPDATE_PROFILE:
          const userProfileIndex = state.userContent.findIndex(
              user => user.id === action.userProfileId
              );
          const updatedUserProfile  = new Profile(
              action.userProfileId,
              action.userProfileData.name,
              action.userProfileData.email,
              action.userProfileData.number,
              action.userProfileData.title,
              action.userProfileData.avatar,
              action.userProfileData.status,
              action.userProfileData.certs,
              action.userProfileData.isVisible
              );
              const updatedAvailableUserProfile = [...state.userContent];
              updatedAvailableUserProfile[userProfileIndex] = updatedUserProfile;
              return{
                  ...state,
                  userContent: updatedAvailableUserProfile
              }

      case DELETE_PROFILE:
          return {
              ...state,
              userContent: state.userContent.filter(userProfile => userProfile.id !== action.userProfileId),
          };
  }
  return state;
};

export default userContentReducer;
