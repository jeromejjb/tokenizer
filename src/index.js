import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for rendering
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
