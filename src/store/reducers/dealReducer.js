import { SET_DEALS_ARRAY, GET_CURRENT_DEAL, UNSET_CURRENT_DEAL } from '../actionTypes';

export const initialDealState = {
    deals: [],
    currentDeal: null
};

export default function dealReducer(state = initialDealState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_DEALS_ARRAY:
            return {
                ...state,
                deals: payload,
            };
        case GET_CURRENT_DEAL:
            return {
                ...state,
                currentDeal: payload,
            };
        case UNSET_CURRENT_DEAL:
            return {
                ...state,
                currentDeal: null
            };
        default:
            return state;
    }
}