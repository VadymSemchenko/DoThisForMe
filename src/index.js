import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles/css/index.css';
import App from './App';
import { store } from './store';

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
