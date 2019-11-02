import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import GetQuote from './GetQuote';

export default function Quote() {
  return (
    <GetQuote>
      {result => {
        return (
          <View style={styles.button}>
            <Button
              title="click to get data from api"
              onPress={() => result.refetch()}
            >
              <Text>Click me!</Text>
            </Button>
            <Text>Quote: {result.data}</Text>
          </View>
        );
      }}
    </GetQuote>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column'
  }
});
