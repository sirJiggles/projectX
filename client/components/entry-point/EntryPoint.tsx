import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import RegOrLogin from '../user/RegOrLogin';
import Pages from '../navigation/Pages';
import { Text, AsyncStorage } from 'react-native';
import Loading from '../loading/Loading';
import currentUser from '../../graph/queries/currentUser';

export default function EntryPoint() {
  // @TODO remove this as we can keep the session if we like
  // later we just need to be better at clearing it
  // AsyncStorage.removeItem('@token');

  // make sure we get current user from the network
  const { loading, error, data, refetch } = useQuery(currentUser, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <Loading />;

  if (error) {
    // clear the old token from the session storage to make sure we can re-login in
    AsyncStorage.removeItem('@token');
    // trigger the re-fetch to make sure we show the login page
    refetch();
  }

  if (data && data.currentUser) {
    return <Pages />;
  }
  return <RegOrLogin />;
}
