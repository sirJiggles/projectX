import React from 'react';
import { View } from 'react-native';
import Loading from '../loading/Loading';
import { ListItem, Button } from 'react-native-elements';
import createChatMutation from '../../graph/mutations/createChat';
import { useMutation } from '@apollo/react-hooks';

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
        disabled={loadingCreateChat}
        onPress={async () =>
          await createChat({
            variables: {
              name: 'someName'
            }
          })
        }
        title="Start"
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
