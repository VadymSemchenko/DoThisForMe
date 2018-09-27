import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
// require('dotenv').config();

ReactDOM.render(
    <Provider>
        <Router>
            <App></App>
        </Router>
    </Provider>,
    document.getElementById('root'));