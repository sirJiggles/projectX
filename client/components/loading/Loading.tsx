import React from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
  let loader;
  if (Platform.OS === 'web') {
    loader = <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    loader = <LottieView source={require('./animation.json')} autoPlay loop />;
  }
  return loader;
}
