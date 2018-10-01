import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { reducer } from "./modules";
import { startListeningForMotionsListChanges, startListeningToAuthChanges } from './actionCreators';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
   };

const pReducer = persistReducer(persistConfig, reducer);
// export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// export const persistor = persistStore(store);
store.dispatch(startListeningForMotionsListChanges());
store.dispatch(startListeningToAuthChanges());
