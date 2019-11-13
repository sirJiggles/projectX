import React from 'react';
import { Text } from 'react-native';
import currentUser from '../../graph/queries/currentUser';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../loading/Loading';

export default function GetCurrentUser() {
  // now re-request current user
  const { error, loading } = useQuery(currentUser, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <Loading />;

  if (error) return <Text>There was an error logging in (current user)</Text>;
}
