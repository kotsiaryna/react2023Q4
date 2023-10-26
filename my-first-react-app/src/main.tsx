import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/App';
import './index.scss';
import ErrorBoundary from './view/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
