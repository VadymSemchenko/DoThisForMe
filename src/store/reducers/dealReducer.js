import { SET_DEALS_ARRAY, GET_CURRENT_DEAL, UNSET_CURRENT_DEAL, START_CHECKING_DEALS, FINISH_CHECKING_DEALS } from '../actionTypes';

export const initialDealState = {
    deals: [],
    currentDeal: null,
    isCheckingDeals: false
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
        case START_CHECKING_DEALS:
            return {
                ...state,
                isCheckingDeals: true
            };
        case FINISH_CHECKING_DEALS:
            return {
                ...state,
                isCheckingDeals: false
            };
        default:
            return state;
    }
}