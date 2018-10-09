import { SET_MOTIONS_ARRAY, GET_NEW_MOTION_ITEM, UNSET_NEW_MOTION_ITEM } from '../actionTypes';

export const initialMotionState = {
    motions: [],
    newMotionItem: null
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
            return {
                ...state,
                newMotionItem: payload
            };
        case UNSET_NEW_MOTION_ITEM:
        return {
            ...state,
            newMotionItem: null
        };
        default:
            return state;
    }
}