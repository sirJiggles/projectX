import Home from '../home/Home';
import Chat from '../chat/Chat';
// import ChatLoading from '../chat-loading/ChatLoading';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Draw from '../draw/draw';
import PlatformSpecificIconName from '../../utils/iconName';

// const ChatStack = createStackNavigator({
//   ChatLoading,
//   Chat
// });

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Chat
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
        } else if (routeName === 'Chat') {
          iconName = 'chatbubbles';
        }

        // iconName = focused ? iconName : `${iconName}-outline`;

        iconName = PlatformSpecificIconName(iconName);

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

const ProfileNavigator = createDrawerNavigator(
  {
    Drawer: TabNavigator
  },
  {
    initialRouteName: 'Drawer',
    contentComponent: Draw,
    drawerWidth: 300
  }
);

// for now we just do not include the draw on the web
// we can do that another way later
export default createAppContainer(
  Platform.OS === 'web' ? TabNavigator : ProfileNavigator
);
