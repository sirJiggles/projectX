import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Gareth rocks!</Text>
      <View style={styles.button}>
        <Button
          title="click to get data from api"
          onPress={() => {
            fetch('http://localhost:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({ query: '{ hello }' })
            })
              .then(r => r.json())
              .then(data => console.log('data returned:', data));
          }}
        >
          Click me!
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flexDirection: 'row'
  }
});
