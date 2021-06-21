import React from 'react';
import ReactDOM from 'react-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';

import './translations';

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
