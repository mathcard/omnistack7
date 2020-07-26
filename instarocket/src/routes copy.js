import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feed from './pages/Feed';
import New from './pages/New';

//import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator({
    Feed, 
    New,
  })
);  