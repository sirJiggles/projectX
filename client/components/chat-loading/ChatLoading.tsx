import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default class ChatLoading extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.button}>
          <Button
            title="Go to chat screen"
            onPress={() => {
              this.props.navigation.navigate('Chat');
            }}
          >
            Go to chat
          </Button>
        </View>
        <View style={style.loading}>
          <LottieView source={require('./animation.json')} autoPlay loop />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center'
  },
  button: {
    marginBottom: 30,
    flex: 1
  },
  loading: {
    flex: 2
  }
});
