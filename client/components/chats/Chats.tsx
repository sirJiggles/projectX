import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../loading/Loading';
import getChats from '../../graph/queries/chats';
import createChatMutation from '../../graph/mutations/createChat';
import Chat from '../../interfaces/chat';
import { ListItem, Button } from 'react-native-elements';
import PlatformSpecificIconName from '../../utils/iconName';

interface ChatResults {
  chats?: Chat[];
}

interface CreateChatResult {
  name?: string;
}

export default function Chats() {
  const { loading: loadingChats, data: chatData, error: chatError } = useQuery<
    ChatResults
  >(getChats);

  const [
    createChat,
    { data: chatCreated, loading: loadingCreateChat }
  ] = useMutation<CreateChatResult>(createChatMutation);

  if (chatError) {
    return <Text>There was an error getting the chats</Text>;
  }

  if (chatData && chatData.chats) {
    return (
      <View>
        <View style={styles.controls}>
          <Button
            icon={{
              name: PlatformSpecificIconName('add-circle-outline'),
              type: 'ionicon',
              color: '#fff'
            }}
            disabled={loadingCreateChat}
            iconRight
            onPress={async () =>
              await createChat({
                variables: {
                  name: 'someName'
                }
              })
            }
            title="Add Chat"
          />
        </View>
        <View style={styles.chats}>
          {loadingChats ? (
            <Loading />
          ) : (
            chatData.chats.map((chat, i) => (
              <ListItem key={i} title={chat.name} bottomDivider />
            ))
          )}
        </View>
      </View>
    );
  }

  return <Loading />;
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chats: {
    marginTop: 30
  }
});
