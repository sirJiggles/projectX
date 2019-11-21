import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import colors from '../../ui/colors';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import currentUser from '../../graph/queries/currentUser';
import getMessages from '../../graph/queries/messages';
import newMessage from '../../graph/subscriptions/newMessage';
import Message from '../../interfaces/message';
import createMessage from '../../graph/mutations/createMessage';
import Loading from '../loading/Loading';

function Chat() {
  const [messages, setMessages] = useState([]);

  // get the user and the messages from the API
  const { data: userData, loading: userLoading } = useQuery(currentUser);
  const {
    data: messagesData,
    error: getMessagesError,
    loading: getMessagesLoading
  } = useQuery(getMessages);

  // subscribe to new messages in this chat
  const { data: newMessageData, error: newMessageError } = useSubscription(
    newMessage
  );

  // get the mutation for creating a message here
  const [
    sendMessage,
    { error: sendMsgError, loading: sendMsgLoading }
  ] = useMutation(createMessage);

  const tapSendMessage = async (sentMessages = []) => {
    const message = sentMessages[0];
    if (!message || !message.text) {
      return;
    }
    await sendMessage({ variables: { content: message.text } });

    // @TODO we need to handle this better
    if (sendMsgError) {
      throw new Error('could not send a message to the server');
    }
  };

  // internal util function to format the messages that come from the API
  const formatMessage = (msg: Message) => {
    return {
      _id: msg.id,
      text: msg.content,
      user: {
        _id: msg.author.id,
        name: msg.author.name,
        avatar: 'https://placeimg.com/140/140/any'
      }
    };
  };

  // when we get a new message from the server for this chat
  useEffect(() => {
    if (newMessageData && newMessageData.newMessage) {
      setMessages([formatMessage(newMessageData.newMessage), ...messages]);
    }
  }, [newMessageData]);

  // when we load all the messages from the server render them
  useEffect(() => {
    if (messagesData && messagesData.messages) {
      const formattedMessages = messagesData.messages.map(message => {
        return formatMessage(message);
      });
      setMessages([...formattedMessages, ...messages]);
    }
  }, [messagesData]);

  if (userLoading || getMessagesLoading) {
    return <Loading />;
  }

  if (newMessageError || getMessagesError) {
    return <Text>Error getting a new message, please reload</Text>;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => tapSendMessage(messages)}
      user={{
        _id: userData.currentUser.id,
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
