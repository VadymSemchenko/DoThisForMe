import { SIGN_IN, SIGN_OUT } from '../actionTypes';

const initialAuthState = {
    uid: '',
    displayName: '',
};

export default function authReducer(state = initialAuthState, action) {
    switch(action.type) {
        case SIGN_IN:
            const { uid, displayName } = action.payload;
            return {
                ...state,
                uid,
                displayName,
            };
        case SIGN_OUT:
            return {
                ...state,
                displayName: null,
                uid: null,
            };
        default:
            return state;
    }
}
