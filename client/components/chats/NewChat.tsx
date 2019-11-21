import React, { SFC, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { ListItem, Input, Button } from 'react-native-elements';
import createChatMutation from '../../graph/mutations/createChat';
import { useMutation } from '@apollo/react-hooks';
import { View, ScrollView, Text } from 'react-native';
import Routes from '../../enums/routes';
import User from '../../interfaces/user';

interface CreateChatResult {
  name?: string;
}

const NewChat: SFC<NavigationInjectedProps> = ({ navigation }) => {
  const [createChat, { data, loading, error }] = useMutation<CreateChatResult>(
    createChatMutation
  );
  const [name, setName] = useState('');

  const contacts = navigation.getParam('contacts') as User[];
  // if we managed to get here by mistake
  if (!contacts) {
    navigation.navigate(Routes.contacts);
  }

  if (data && data.name) {
    // when we have made the chat, lets head on back to the chats page for now
    // @TODO we need to make this go into the chat soon! with the user
    navigation.navigate(Routes.chats);
  }

  if (error) {
    return <Text>There was an error {JSON.stringify(error)}</Text>;
  }

  return (
    <View>
      <Input
        value={name}
        disabled={loading}
        onChangeText={text => {
          setName(text);
        }}
        placeholder="Chat name.."
      />
      <ScrollView>
        {contacts.map((contact, i) => (
          <ListItem
            key={i}
            title={contact.name}
            subtitle={contact.nickname || ''}
            leftAvatar={
              contact.imageAvailable
                ? {
                    source: {
                      uri: contact.image.uri
                    }
                  }
                : null
            }
            bottomDivider
          />
        ))}
      </ScrollView>
      <Button
        disabled={loading || name === ''}
        onPress={async () =>
          await createChat({
            variables: {
              name,
              members: contacts
            }
          })
        }
        title="Go"
      />
    </View>
  );
};

export default NewChat;
