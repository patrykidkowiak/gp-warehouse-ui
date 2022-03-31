import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './Keycloak';

console.log(process.env.KEYCLOAK_URL)
console.log(process.env)

ReactDOM.render(


  <React.StrictMode>
      <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
          <App />
      </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
