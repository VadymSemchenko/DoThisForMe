import { SET_MOTION, SET_NEW_MOTION_KEY, SET_MOTIONS_ARRAY } from '../actionTypes';

export const initialMotionState = {
    motions: [],
    newMotion: {
        uid: '',
        key: ''
    }
};

export default function motionReducer(state = initialMotionState, action) {
    const { type, payload } = action;
    switch(type) {
        // case SET_MOTION:
        // const { displayName, value, key, uid, time } = payload;
        // return {
        //     ...state, motions: [...state.motions, { displayName, value, key, uid, time }]
        // };
        case SET_NEW_MOTION_KEY:
            return {
            ...state, newMotion: payload
        }
        case SET_MOTIONS_ARRAY:
            return {
                ...state, motions: payload
            };
        default:
            return state;
    }
  }