import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/css/index.css';
import App from './App';
import store from './store';
// require('dotenv').config();

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