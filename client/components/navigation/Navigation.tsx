import Home from '../home/Home';
import Chat from '../chat/Chat';
import ChatLoading from '../chat-loading/ChatLoading';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';

const ChatStack = createStackNavigator({
  ChatLoading,
  Chat
});

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    ChatStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'ChatStack') {
          iconName = 'chatbubbles';
        }

        // iconName = focused ? iconName : `${iconName}-outline`;
        iconName = Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`;

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.dark.hex,
      inactiveTintColor: colors.light.hex
    }
  }
);

export default createAppContainer(TabNavigator);
