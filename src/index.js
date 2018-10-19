import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './styles/css/index.css';
import App from './App';
import storeConfig from './store';
import theme from './theme';

const { store, persistor } = storeConfig;

ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                    <MuiThemeProvider theme={theme}>
                        <App />
                    </MuiThemeProvider>
            </PersistGate>
        </Provider>,
    document.getElementById('root'),
);
