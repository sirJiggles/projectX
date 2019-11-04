import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import EntryPoint from './components/entry-point/EntryPoint';
import { AsyncStorage } from 'react-native';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: async operation => {
    // here we can add the token to all the requests to the API
    // if it is there :D
    const token = await AsyncStorage.getItem('@token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <EntryPoint />
    </ApolloProvider>
  );
}
