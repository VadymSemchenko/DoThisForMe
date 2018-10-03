import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './styles/css/index.css';
import App from './App';
import storeConfig from './store';

const { store, persistor } = storeConfig;

ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                    <App />
            </PersistGate>
        </Provider>,
    document.getElementById('root'),
);
