import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import EntryPoint from './components/entry-point/EntryPoint';
import client from './networking/client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <EntryPoint />
    </ApolloProvider>
  );
}
