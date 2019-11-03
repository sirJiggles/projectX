import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Quote from '../quote/Quote';
import colors from '../../ui/colors';

export default class Home extends Component {
  state: {
    messageToSend: '';
  };

  sendMessage() {
    console.log('we should now send the message!');
    console.log(this.state.messageToSend);
    // clear the text input after we clear the text
    this.setState({});
    // @TODO send the message to the server!
  }

  render() {
    return (
      <View style={styles.container}>
        <Quote />
        <View style={styles.messageSender}>
          <Text style={styles.messageInstructions}>
            Send a message to chat:
          </Text>
          <TextInput
            style={styles.messageInput}
            onChangeText={text => {
              this.setState({ ...this.state, messageToSend: text });
            }}
          />
          <Button
            title="send a message"
            onPress={() => {
              this.sendMessage();
            }}
          >
            Send message
          </Button>
        </View>
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
  },
  messageSender: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: '70%'
  },
  messageInstructions: {
    color: colors.lightContext.hex
  },
  messageInput: {
    height: 50,
    borderColor: colors.lightContext.hex,
    borderWidth: 2,
    borderRadius: 3,
    paddingLeft: 20,
    paddingRight: 20
  }
});
