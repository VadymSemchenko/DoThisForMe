import { combineReducers } from 'redux';
import authReducer from './authReducer';
import motionReducer from './motionReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

  export const reducer = combineReducers({ authReducer, motionReducer, loadingReducer, errorReducer });