import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../loading/Loading';

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>There was an error logging in </Text>;
  }
  if (data) {
    if (!data.login && !data.login.token) {
      return <Loading />;
    }
    AsyncStorage.setItem('@token', data.login.token);
    return <Text>You are now logged in salor!</Text>;
  }
}
