import { SIGN_IN, SIGN_OUT } from '../actionTypes';

const initialAuthState = {
    userID: '',
    userName: '',
};

export default function authReducer(state = initialAuthState, action) {
    switch(action.type) {
        case SIGN_IN:
            const { userID, userName } = action.payload;
            return { userID, userName };
        case SIGN_OUT:
            return initialAuthState;
        default:
            return state;
    }
}
