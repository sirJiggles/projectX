import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import colors from '../../ui/colors';

export default class Chat extends Component {
  state = {
    messages: []
  };

  static navigationOptions = {
    title: 'Le Chat'
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: colors.dark.hex
                },
                left: {
                  backgroundColor: colors.light.hex
                }
              }}
              textStyle={{
                right: {
                  color: colors.darkContext.hex
                },
                left: {
                  color: colors.lightContext.hex
                }
              }}
            />
          );
        }}
      />
    );
  }
}
