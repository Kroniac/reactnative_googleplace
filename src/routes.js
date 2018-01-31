import React from 'react';
import { Text, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import EnterData from './container/EnterData';
import FetchData from './container/FetchData';
import Icon from 'react-native-vector-icons/Ionicons';

export const Tabs = TabNavigator(
  {
    EnterData: {
      screen: EnterData,
      navigationOptions: {
        tabBarlabel: 'Insert Details',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-map" size={25} color={tintColor} />
        )
      }
    },
    FindTrucks: {
      screen: FetchData,
      navigationOptions: {
        tabBarlabel: 'Get Details',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-code-download" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,

    tabBarOptions: {
      activeTintColor: '#F44336',
      activeBackgroundColor: '#4FC3F7',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      style: {
        padding: 2,
        backgroundColor: '#B3E5FC', 
      },
      swipeEnabled: true
    }
  }
);
