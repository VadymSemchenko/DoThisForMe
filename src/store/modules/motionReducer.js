import { SET_MOTION } from '../actionTypes';

export const initialMotionState = {
    motions: []
};

export default function motionReducer(state = initialMotionState, action) {
    switch(action.type) {
      case SET_MOTION:
        const { displayName, value, key, uid, time } = action.payload;
        return {
            ...state, motions: [...state.motions, { displayName, value, key, uid, time }]
        };
      default:
        return state;
    }
  }