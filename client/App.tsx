import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import EntryPoint from './components/entry-point/EntryPoint';
import client from './networking/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <EntryPoint />
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
