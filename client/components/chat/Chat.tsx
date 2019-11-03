import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ChatLoading extends Component {
  static navigationOptions = {
    title: 'Le Chat'
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to, le chat</Text>
      </View>
    );
  }
}
