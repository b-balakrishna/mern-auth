import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>
);
