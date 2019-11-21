import React, { SFC, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Loading from '../loading/Loading';
import { ListItem, Button, SearchBar } from 'react-native-elements';
import createChatMutation from '../../graph/mutations/createChat';
import { useMutation } from '@apollo/react-hooks';
import * as Permissions from 'expo-permissions';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';
import Routes from '../../enums/routes';
import * as Contacts from 'expo-contacts';
import { url } from 'inspector';

interface CreateChatResult {
  name?: string;
}

async function getContacts(navProps: NavigationInjectedProps) {
  const { status } = await Permissions.getAsync(Permissions.CONTACTS);
  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    // if after asking for permissions to contacts we still get a no then
    // lets just navigate away
    if (status !== 'granted') {
      navProps.navigation.navigate(Routes.chats);
      return;
    }
  }
  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.FirstName,
      Contacts.Fields.LastName,
      Contacts.Fields.Image
    ]
  });

  return data;
}

const ContactsList: SFC<NavigationInjectedProps> = navProps => {
  const [contacts, setContacts] = useState([]);
  const [contactsSelected, addContactToChat] = useState([]);
  const [search, setSearchTerm] = useState('');

  // first thing we need to do on this page is check if we need
  // permissions to get the contacts
  useEffect(() => {
    async function requestContacts() {
      const data = await getContacts(navProps);
      setContacts(data);
    }

    requestContacts();
  }, ['contacts']);

  const [
    createChat,
    { data: chatCreated, loading: loadingCreateChat }
  ] = useMutation<CreateChatResult>(createChatMutation);

  // the filtering of the contacts based on search terms
  let filteredContacts = [];
  if (search !== '') {
    const searchPattern = new RegExp(`(?=.*${search})`, 'i');
    filteredContacts = contacts.filter(contact =>
      contact.name.match(searchPattern)
    );
  } else {
    filteredContacts = contacts;
  }

  return (
    <View>
      <SearchBar
        placeholder="Contact name..."
        onChangeText={term => {
          setSearchTerm(term);
        }}
        value={search}
      />

      <ScrollView>
        {!filteredContacts.length ? (
          <Loading />
        ) : (
          filteredContacts.map((contact, i) => (
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
          ))
        )}
      </ScrollView>

      <Button
        disabled={loadingCreateChat || !contactsSelected.length}
        onPress={async () =>
          await createChat({
            variables: {
              name: 'someName',
              members: contactsSelected
            }
          })
        }
        title="Start"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactsList;
