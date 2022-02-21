import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

//require("dotenv").config({ path: "../.env" });

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		//uri: process.env.FRONTEND_URI,
		uri: 'http://localhost:4000'
	})
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
