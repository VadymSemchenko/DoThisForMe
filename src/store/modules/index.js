import { combineReducers } from 'redux';
import motionReducer, {initialMotionState} from './motionReducer';

export const initialState = {
    motionReducer: initialMotionState,
  };

  export const reducer = combineReducers({ motionReducer });