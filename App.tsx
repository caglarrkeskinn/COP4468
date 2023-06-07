import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTab from './navigator/index'

const App = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
