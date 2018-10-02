import * as actionTypes from '../actionTypes';

const initialLoadingState = {
    isLoading: false,
};

export default function loadingReducer(state = initialLoadingState, action) {
    switch(action.type) {
        case actionTypes.START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FINISH_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
