import {ADD_PROFILE, REMOVE_PROFILE} from '../actions/userProfile'

export const initialState = {
  profile: null
}

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
      case ADD_PROFILE:
        return {
          ...state,
          profile: action.payload
        }
      case REMOVE_PROFILE:
        return {
          ...state,
          profile: null
        }
      default:
        return state
    }
}