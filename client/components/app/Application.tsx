import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Quote from '../quote/Quote';
import TabBar from '../tab-bar/TabBar';

export default class Application extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Quote />
        <TabBar />
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
