import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MessageSender from '../message-sender/MessageSender';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MessageSender />
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
