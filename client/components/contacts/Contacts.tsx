import React from 'react';
import { View } from 'react-native';
import Loading from '../loading/Loading';
import { ListItem, Button } from 'react-native-elements';
import createChatMutation from '../../graph/mutations/createChat';
import { useMutation } from '@apollo/react-hooks';
import PlatformSpecificIconName from '../../utils/iconName';

interface CreateChatResult {
  name?: string;
}

export default function Contacts() {
  const [
    createChat,
    { data: chatCreated, loading: loadingCreateChat }
  ] = useMutation<CreateChatResult>(createChatMutation);

  const loadingContacts = false;
  const contacts = [
    {
      name: 'gareth',
      avatar: 'something'
    }
  ];
  return (
    <View>
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
      {loadingContacts ? (
        <Loading />
      ) : (
        contacts.map((contact, i) => (
          <ListItem key={i} title={contact.name} bottomDivider />
        ))
      )}
    </View>
  );
}
