import React from 'react';
import { Text, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import EnterShipperDetails from './container/EnterShipperDetails';
import FindShipper from './container/FindShipper';
import Icon from 'react-native-vector-icons/Ionicons';

export const Tabs = TabNavigator(
  {
    EnterShipperDetails: {
      screen: EnterShipperDetails,
      navigationOptions: {
        tabBarlabel: 'Insert Details',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-map" size={25} color={tintColor} />
        )
      }
    },
    FindShipper: {
      screen: FindShipper,
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
      activeBackgroundColor: '#4DB6AC',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      style: {
        padding: 2,
        backgroundColor: '#B2DFDB'
      },
      swipeEnabled: true
    }
  }
);
