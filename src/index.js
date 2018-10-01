import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles/css/index.css';
import App from './App';
import { store, /*persistor*/ } from './store';
// require('dotenv').config();

// ReactDOM.render(
//     <Provider store={store}>
//         <PersistGate loading={<CircularProgress />} persistor={persistor}>
//             <Router>
//                 <App></App>
//             </Router>
//         </PersistGate>
//     </Provider>,
//     document.getElementById('root'));

ReactDOM.render(
    <Provider store={store}>
            <Router>
                <App></App>
            </Router>
    </Provider>,
    document.getElementById('root'));

// ReactDOM.render(
//         <Router>
//             <App></App>
//         </Router>,
//     document.getElementById('root'));