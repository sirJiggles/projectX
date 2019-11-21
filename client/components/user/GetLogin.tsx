import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../loading/Loading';
import GetCurrentUser from './GetCurrentUser';
import login from '../../graph/queries/login';

export default function GetLogin(props) {
  const { number, password } = props;
  const { error, data, loading } = useQuery(login, {
    variables: {
      number,
      password
    }
  });

  if (loading) return <Loading />;

  if (error) return <Text>There was an error logging in </Text>;

  if (data) {
    if (!data.login && !data.login.token) {
      return <Loading />;
    }

    AsyncStorage.setItem('@token', data.login.token);

    return <GetCurrentUser />;
  }
}
