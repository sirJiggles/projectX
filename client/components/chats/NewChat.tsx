import React, { SFC, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { ListItem, Input, Button } from 'react-native-elements';
import createChatMutation from '../../graph/mutations/createChat';
import { useMutation } from '@apollo/react-hooks';
import { View, ScrollView } from 'react-native';
import Routes from '../../enums/routes';

interface CreateChatResult {
  name?: string;
}

const NewChat: SFC<NavigationInjectedProps> = ({ navigation }) => {
  const [
    createChat,
    { data: chatCreated, loading: loadingCreateChat }
  ] = useMutation<CreateChatResult>(createChatMutation);
  const [name, setName] = useState('');

  const contacts = navigation.getParam('contacts');
  // if we managed to get here by mistake
  if (!contacts) {
    navigation.navigate(Routes.contacts);
  }

  return (
    <View>
      <Input
        value={name}
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
        disabled={loadingCreateChat || name === ''}
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
