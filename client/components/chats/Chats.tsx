import React, { SFC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../loading/Loading';
import getChats from '../../graph/queries/chats';
import Chat from '../../interfaces/chat';
import { ListItem, Button } from 'react-native-elements';
import PlatformSpecificIconName from '../../utils/iconName';
import Routes from '../../enums/routes';
import { NavigationInjectedProps } from 'react-navigation';

interface ChatResults {
  chats?: Chat[];
}

const Chats: SFC<NavigationInjectedProps> = ({ navigation }) => {
  const { loading: loadingChats, data: chatData, error: chatError } = useQuery<
    ChatResults
  >(getChats);

  if (chatError) {
    return <Text>There was an error getting the chats</Text>;
  }

  if (chatData && chatData.chats) {
    return (
      <View>
        <View>
          <Button
            icon={{
              name: PlatformSpecificIconName('add-circle-outline'),
              type: 'ionicon',
              color: '#fff'
            }}
            iconRight
            onPress={() => {
              navigation.navigate(Routes.contacts);
            }}
            title="New Chat"
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
};

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

export default Chats;
