import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Application from './components/app/Application';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Application />
    </ApolloProvider>
  );
}
