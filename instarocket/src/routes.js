import React from 'react';
import { View, Text, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator({
    Feed, 
    New,
  }, {
    //initialRouteName: 'New', // Provisorio
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerTitle: <Image style={{marginHorizontal: 80}} source={logo} />,
      headerBackTitle: null,
    },
    mode: 'modal' // Animação debaixo para cima
  })
);  