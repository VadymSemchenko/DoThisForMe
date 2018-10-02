import { combineReducers } from 'redux';
import authReducer from './authReducer';
import motionReducer from './motionReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

const rootReducer = {
  authReducer,
  motionReducer,
  loadingReducer,
  errorReducer,
};

export const reducer = combineReducers(rootReducer);
