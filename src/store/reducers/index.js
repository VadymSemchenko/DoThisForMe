import { combineReducers } from 'redux';
import authReducer from './authReducer';
import motionReducer from './motionReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import dealReducer from './dealReducer';
import langReducer from './langReducer';

const rootReducer = {
  authReducer,
  motionReducer,
  loadingReducer,
  errorReducer,
  dealReducer,
  langReducer
};

export const reducer = combineReducers(rootReducer);
