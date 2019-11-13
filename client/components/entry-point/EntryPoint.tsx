import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import RegOrLogin from '../user/RegOrLogin';
import Pages from '../navigation/Pages';
import { Text, AsyncStorage } from 'react-native';
import Loading from '../loading/Loading';
import currentUser from '../../graph/queries/currentUser';

export default function EntryPoint() {
  AsyncStorage.removeItem('@token');
  // make sure we get current user from the network
  const { loading, error, data } = useQuery(currentUser, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <Loading />;

  if (error) {
    // clear the old token from the session storage to make sure we can re-login in
    AsyncStorage.removeItem('@token');
  }

  if (data && data.currentUser) {
    return <Pages />;
  }
  return <RegOrLogin />;
}
