import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import CredentialsContext from './CredentialsProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
