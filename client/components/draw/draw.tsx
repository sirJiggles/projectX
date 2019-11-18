import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import PlatformSpecificIconName from '../../utils/iconName';

const list = [
  {
    title: 'My Account',
    icon: {
      name: PlatformSpecificIconName('person'),
      type: 'ionicon'
    }
  },
  {
    title: 'Logout',
    icon: {
      name: PlatformSpecificIconName('exit'),
      type: 'ionicon'
    }
  }
];

export default function Draw() {
  return (
    <View style={styles.container}>
      {list.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={item.icon}
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
