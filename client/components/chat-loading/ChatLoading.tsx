import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native';
import LottieView from 'lottie-react-native';

export default class ChatLoading extends Component {
  render() {
    let loader;
    if (Platform.OS === 'web') {
      loader = <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      loader = (
        <LottieView source={require('./animation.json')} autoPlay loop />
      );
    }
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

        <View style={style.loading}>{loader}</View>
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
