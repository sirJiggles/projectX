import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import PlatformSpecificIconName from '../../utils/iconName';
import { useQuery } from '@apollo/react-hooks';
import currentUser from '../../graph/queries/currentUser';

export default function Draw() {
  const { refetch } = useQuery(currentUser);

  const logout = () => {
    AsyncStorage.removeItem('@token');

    // trigger a reload of current user now the token is gone
    // this will force the app's internal graph to update and re-render
    // kicking us out
    refetch();
  };
  const list = [
    {
      title: 'My Account',
      onPress: () => {
        // @TODO when we have the 'my profile' view later on
        // this.props.navigation.navigate('Profile');
      },
      icon: {
        name: PlatformSpecificIconName('person'),
        type: 'ionicon'
      }
    },
    {
      title: 'Logout',
      onPress: logout,
      icon: {
        name: PlatformSpecificIconName('exit'),
        type: 'ionicon'
      }
    }
  ];

  return (
    <View style={styles.container}>
      {list.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={item.icon}
          onPress={item.onPress}
          bottomDivider
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
});
