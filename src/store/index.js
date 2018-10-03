import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { reducer as rootReducer } from './modules';
import { startListeningForMotionsListChanges, startListeningToAuthChanges } from './actionCreators';

const persistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = () => {
    const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
    store.dispatch(startListeningForMotionsListChanges());
    store.dispatch(startListeningToAuthChanges());
    const persistor = persistStore(store);
    return { persistor, store };
    };

export default configStore();
