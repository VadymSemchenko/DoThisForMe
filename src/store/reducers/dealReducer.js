import { SET_DEALS_ARRAY, SET_SELECTED_DEAL } from '../actionTypes';

export const initialDealState = {
    deals: [],
    selectedDeal: ''
};

export default function dealReducer(state = initialDealState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_DEALS_ARRAY:
            return {
                ...state,
                deals: payload,
            };
        case SET_SELECTED_DEAL:
            return {
                ...state,
                selectedDeal: payload,
            };
        default:
            return state;
    }
}