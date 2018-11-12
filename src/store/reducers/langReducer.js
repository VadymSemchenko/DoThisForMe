import { SELECT_LANG } from '../actionTypes';

export const initialLangState = {
    lang: 'en'
};

export default function langReducer(state = initialLangState, action) {
    const { type, payload } = action;
    switch(type) {
        case SELECT_LANG:
            return { lang: payload };
        default:
            return state;
        }
  }