import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGIN = gql`
  query Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

export default function GetLogin(props) {
  const { name, password } = props;
  const { error, data, loading } = useQuery(LOGIN, {
    variables: {
      name,
      password
    }
  });

  if (error) {
    console.error('could not login');
    return <Text>There was an error logging in </Text>;
  }
  if (data) {
    console.error('we got the token back from the register', data.token);

    AsyncStorage.setItem('@token', data.token);
  }
}
