import { SIGN_IN, SIGN_OUT  } from '../actionTypes';

export const initialAuthState = {
    uid: null,
    displayName: null
};

export default function authReducer(state = initialAuthState, action) {
    switch(action.type) {
        case SIGN_IN:
        const { uid, displayName } = action.payload;
            return {
        ...state, uid, displayName
        };
        case SIGN_OUT:
            return {
        ...state, uid: null, displayName: null
        };
        default:
            return state;
        }
  }