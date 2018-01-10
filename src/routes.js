import React from 'react';
import { Text, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Screen1 from './container/screen1';
import Screen2 from './container/screen2';
import Icon from 'react-native-vector-icons/Ionicons';

export const Tabs = TabNavigator(
  {
    EnterData: {
      screen: Screen1,
      navigationOptions: {
        tabBarlabel: 'Insert Details',
        tabBarIcon: () => <Icon name="md-map" size={25} />
      }
    },
    FindTrucks: {
      screen: Screen2,
      navigationOptions: {
        tabBarlabel: 'Get Details',
        tabBarIcon: () => <Icon name="md-code-download" size={25} />
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12
      },
      swipeEnabled: false
    }
  }
);

