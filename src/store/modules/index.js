import { combineReducers } from 'redux';
import authReducer, { initialAuthState } from './authReducer';
import motionReducer, { initialMotionState } from './motionReducer';
import loadingReducer, { initialLoadingState } from './loadingReducer';

export const initialState = {
    authReducer: initialAuthState,
    motionReducer: initialMotionState,
    loadingReducer: initialLoadingState,
  };

  export const reducer = combineReducers({ authReducer, motionReducer, loadingReducer });