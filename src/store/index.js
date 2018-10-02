import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './modules';
import { startListeningForMotionChanges, startListeningToAuthChanges } from './actionCreators';

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(startListeningForMotionChanges());
store.dispatch(startListeningToAuthChanges());

export default store;
