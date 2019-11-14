import React, { useState } from 'react';
import GetCurrentUser from '../user/GetCurrentUser';
import { useQuery } from '@apollo/react-hooks';
import allMessages from '../../graph/queries/allMessages';
import Loading from '../loading/Loading';
import { Text } from 'react-native';

export default function ChatMessages() {
  const [messages, setMessages] = useState([]);

  const { loading, data, error } = useQuery(allMessages);

  if (loading) return <Loading />;
  if (error) return <Text>There was an error getting the messages</Text>;
  if (data && data.messages) {
    return data.messages;
  }
}
