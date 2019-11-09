import React from 'react';
import { Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '../loading/Loading';

const QUOTE = gql`
  {
    quoteOfTheDay
  }
`;

export default function GetQuote({ children }) {
  const { loading, error, data, refetch } = useQuery(QUOTE);

  if (loading) {
    return <Loading />;
  }
  if (error) return <Text>Error :(</Text>;

  return children({ data: data.quoteOfTheDay, refetch });
}
