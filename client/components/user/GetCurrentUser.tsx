import React from 'react';
import { Text } from 'react-native';
import { CURRENT_USER_QUERY } from '../entry-point/EntryPoint';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../loading/Loading';

export default function GetCurrentUser() {
  // now re-request current user
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <Loading />;

  if (error) return <Text>There was an error logging in (current user)</Text>;
  if (data) {
    console.error('did the login and the current data is:', data);
    return null;
  }
}
