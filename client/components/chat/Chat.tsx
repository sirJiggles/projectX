import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import colors from '../../ui/colors';
import { useQuery, useMutation } from '@apollo/react-hooks';
import currentUser from '../../graph/queries/currentUser';
import allMessages from '../../graph/queries/allMessages';
import Message from '../../interfaces/message';
import createMessage from '../../graph/mutations/createMessage';

function Chat() {
  const [messages, setMessages] = useState([
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
  ]);

  // get the user and the messages from the API
  const { data: userData } = useQuery(currentUser);
  const { data: messageData } = useQuery(allMessages);
  // get the mutation for creating a message here
  const [
    sendMessage,
    { error: sendMsgError, loading: sendMsgLoading }
  ] = useMutation(createMessage);

  const onSend = (msgs = []) => {
    setMessages(GiftedChat.append(messages, msgs));
    console.log(msgs);
    // sendMessage()
  };

  // internal util function to format the messages that come from the API
  const formatMessages = (messagesToFormat: Message[]) => {
    return messagesToFormat.map(msg => {
      if (!msg.id) {
        return;
      }
      return {
        _id: msg.id,
        text: msg.content,
        user: {
          _id: msg.author.id,
          name: msg.author.name,
          avatar: 'https://placeimg.com/140/140/any'
        }
      };
    });
  };

  if (messageData && messageData.allMessages) {
    // @TODO still getting some strange errors here :/
    useEffect(() => {
      setMessages(formatMessages(messageData.allMessages));
    });
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userData ? userData.id : null,
        avatar: 'https://placeimg.com/140/140/any'
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

Chat.navigationOptions = {
  title: 'le chat'
};

export default Chat;
