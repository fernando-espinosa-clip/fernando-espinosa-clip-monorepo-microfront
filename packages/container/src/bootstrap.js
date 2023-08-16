import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
require('./mocks');

ReactDOM.render(<App />, document.querySelector('#root'));
