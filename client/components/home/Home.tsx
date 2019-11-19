import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Chats from '../chats/Chats';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Chats />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
});
