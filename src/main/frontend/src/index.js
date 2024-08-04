import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/Bootstrap.css';
import './css/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   //두번랜더링되는걸 방지
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

reportWebVitals();
