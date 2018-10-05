import { SET_MOTIONS_ARRAY, GET_NEW_MOTION_ITEM } from '../actionTypes';

export const initialMotionState = {
    motions: [],
    newMotionItem: {}
};

export default function motionReducer(state = initialMotionState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_MOTIONS_ARRAY:
            return {
                ...state,
                motions: payload,
            };
        case GET_NEW_MOTION_ITEM:
            console.log('GET_MOTION_ITEM_IN_REDUCER');
            return {
                ...state,
                newMotionItem: payload
            };
        default:
            return state;
    }
}