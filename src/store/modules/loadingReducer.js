import { START_LOADING, FINISH_LOADING } from '../actionTypes';

export const initialLoadingState = {
    isLoading: false
};

export default function loadingReducer(state = initialLoadingState, action) {
    switch(action.type) {
      case START_LOADING:
        return {
            ...state, isLoading: true
        };
        case FINISH_LOADING:
        return {
            ...state, isLoading: false
        };
      default:
        return state;
    }
  }