import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUOTE = gql`
  {
    quoteOfTheDay
  }
`;

export default function GetQuote({ children }) {
  const { loading, error, data, refetch } = useQuery(QUOTE);

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) return <Text>Error :(</Text>;

  return children({ data: data.quoteOfTheDay, refetch });
}

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
