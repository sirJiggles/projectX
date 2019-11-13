import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import RegOrLogin from '../user/RegOrLogin';
import Pages from '../navigation/Pages';
import { Text } from 'react-native';
import Loading from '../loading/Loading';
import currentUser from '../../graph/queries/currentUser';

export default function EntryPoint() {
  // make sure we get current user from the network
  const { loading, error, data } = useQuery(currentUser, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <Loading />;

  if (error) {
    // if there is an error it could be that there is a session already
    // in this case we will try log the user out
    <Text>Your session has timed out you need to login again</Text>;
  }

  if (data && data.currentUser) {
    return <Pages />;
  }
  return <RegOrLogin />;
}
