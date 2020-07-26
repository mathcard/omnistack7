import React, { Component } from 'react';
import { YellowBox } from 'react-native';

// Ocultar Warnings
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'headerTitle'
])

import Feed from './pages/Feed';
import Routes from './routes'; 

export default function App(){
  return <Routes />
}