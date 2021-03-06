import React, { SFC, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Loading from '../loading/Loading';
import { ListItem, Button, SearchBar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';
import Routes from '../../enums/routes';
import * as Contacts from 'expo-contacts';
import PlatformSpecificIconName from '../../utils/iconName';

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
  const [contactsSelected, setSelectedContacts] = useState([]);
  const [search, setSearchTerm] = useState('');

  // first thing we need to do on this page is check if we need
  // permissions to get the contacts
  useEffect(() => {
    async function requestContacts() {
      const phoneContacts = await getContacts(navProps);

      // not we have the phone contacts we need to split them into
      // ones in the app and ones not in the app via a query
      setContacts(phoneContacts);
    }

    requestContacts();
  }, [contacts]);

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

  function toggleContact(contact: Contacts.Contact) {
    if (contactsSelected.includes(contact)) {
      // remove it from the list
      setSelectedContacts(contactsSelected.filter(c => c !== contact));
    } else {
      setSelectedContacts([...contactsSelected, contact]);
    }
  }

  return (
    <View>
      <SearchBar
        placeholder="Contact name..."
        lightTheme={true}
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
              onPress={() => {
                toggleContact(contact);
              }}
              rightIcon={
                contactsSelected.includes(contact)
                  ? {
                      name: PlatformSpecificIconName(
                        'checkmark-circle-outline'
                      ),
                      type: 'ionicon'
                    }
                  : null
              }
              bottomDivider
            />
          ))
        )}
      </ScrollView>

      <Button
        disabled={!contactsSelected.length}
        onPress={() =>
          navProps.navigation.navigate({
            routeName: Routes.newChat,
            params: {
              contacts: contactsSelected
            }
          })
        }
        title="Next"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactsList;
