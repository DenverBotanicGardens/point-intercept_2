import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react"
require('dotenv').config();

ReactDOM.render(
  
  <>
    <Auth0Provider
      domain={"dev-bh957c52.us.auth0.com"}
      clientId={"FmfZlunLrdLaOYzV1ocK5s8ZtnLexm8S"}
      redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
