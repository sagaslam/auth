import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { StateMachineProvider, createStore } from 'little-state-machine';
import App from './App.jsx';
import client from './client';

createStore({});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StateMachineProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateMachineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
