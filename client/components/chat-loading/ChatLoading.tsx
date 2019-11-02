import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class ChatLoading extends Component {
  render() {
    return (
      <View>
        <Button
          title="Go to chat screen"
          onPress={() => {
            this.props.navigation.navigate('Chat');
          }}
        >
          Go to chat
        </Button>
      </View>
    );
  }
}
