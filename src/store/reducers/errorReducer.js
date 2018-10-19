import { SET_ERROR, DELETE_ERROR } from '../actionTypes';

export const initialErrorState = {
    error: ''
};

export default function errorReducer(state = initialErrorState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_ERROR:
            return { error: payload };
        case DELETE_ERROR:
            return { error: '' };
        default:
            return state;
        }
  }