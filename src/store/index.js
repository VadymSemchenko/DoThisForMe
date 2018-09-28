import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer, initialState } from "./modules";

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;