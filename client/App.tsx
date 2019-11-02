import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './components/home/Home';
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home,
  Settings: SettingsScreen
});

const NavigationAppContainer = createAppContainer(TabNavigator);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationAppContainer />
    </ApolloProvider>
  );
}
