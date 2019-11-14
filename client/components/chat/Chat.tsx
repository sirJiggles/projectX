import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import colors from '../../ui/colors';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import currentUser from '../../graph/queries/currentUser';
import allMessages from '../../graph/subscriptions/allMessages';
import Message from '../../interfaces/message';
import createMessage from '../../graph/mutations/createMessage';
import Loading from '../loading/Loading';

function Chat() {
  const [messages, setMessages] = useState([]);

  // get the user and the messages from the API
  const { data: userData } = useQuery(currentUser);
  const { data: messageData } = useSubscription(allMessages);
  // get the mutation for creating a message here
  const [
    sendMessage,
    { error: sendMsgError, loading: sendMsgLoading }
  ] = useMutation(createMessage);

  const onSend = async (sentMessages = []) => {
    const message = sentMessages[0];
    if (!message || !message.text) {
      return;
    }
    await sendMessage({ variables: { content: message.text } });

    // @TODO we need to handle this better
    if (sendMsgError) {
      throw new Error('could not send a message to the server');
    }
    // setMessages(GiftedChat.append(messages, sentMessages));
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

  useEffect(() => {
    if (messageData && messageData.allMessages) {
      setMessages(formatMessages(messageData.allMessages));
    }
  }, [messageData]);

  if (!userData || !userData.currentUser) {
    return <Loading />;
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
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
