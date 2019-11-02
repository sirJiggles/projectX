import React from 'react';
import { Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUOTE = gql`
  {
    quoteOfTheDay
  }
`;

export default function GetQuote({ children }) {
  const { loading, error, data, refetch } = useQuery(QUOTE);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return children({ data: data.quoteOfTheDay, refetch });
}
