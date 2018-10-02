import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './modules';
import { startListeningForMotionsListChanges, startListeningToAuthChanges } from './actionCreators';

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(startListeningForMotionsListChanges());
store.dispatch(startListeningToAuthChanges());

export default store;