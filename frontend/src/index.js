import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import store  from './store';
import { Provider } from 'react-redux';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offet: '30px',
  transition: transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
       <App />
    </AlertProvider>
  </Provider>
);

