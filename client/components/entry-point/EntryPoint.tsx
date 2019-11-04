import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import RegOrLogin from '../user/RegOrLogin';
import Pages from '../navigation/Pages';
import { View, ActivityIndicator, Text } from 'react-native';

const CURRENT_USER = gql`
  {
    currentUser {
      id
    }
  }
`;

export default function EntryPoint() {
  // make sure we get current user from the network
  const { loading, error, data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) return <Text>Error :(</Text>;

  if (data.currentUser) {
    return <Pages />;
  }
  return <RegOrLogin />;
}
