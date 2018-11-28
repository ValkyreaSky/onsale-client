import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { injectGlobal } from 'styled-components';
import 'lazysizes';
// Root component
import App from 'App';
// Service Worker
import registerServiceWorker from 'registerServiceWorker';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://selli-api.herokuapp.com/' : 'http://192.168.1.216:5000';

/* eslint-disable no-unused-expressions */
injectGlobal`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  .ant-row .ant-form-item {
    margin-bottom: 0;
  }

  .ant-list-item:last-of-type {
    padding-bottom: 0;
  }

  html {
  -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: "Source Sans Pro", sans-serif !important;
    font-size: 1.6rem !important;
  }

  a {
    text-decoration: none !important;
  }

  p, ul {
    margin-bottom: 0 !important;
  }
`;

// Hot Module Replacement
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require
    ReactDOM.render(<NextApp />, document.getElementById('app'));
  });
}

ReactDOM.render(<App />, document.getElementById('app'));

registerServiceWorker();
