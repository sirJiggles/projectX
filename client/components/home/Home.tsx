import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* List all the chats in the app */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
