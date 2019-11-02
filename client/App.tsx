import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import Navigation from './components/navigation/Navigation';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
