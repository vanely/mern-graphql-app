import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// connection to the url that out graphql server is running on
const client = new ApolloClient({
    uri: "http://localhost:4000"
});

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

// wrap app in apollo provider allowing access to the client throughout the entire application
ReactDOM.render(
<ApolloProvider>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
