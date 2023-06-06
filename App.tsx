import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTab from './navigator';

const App = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    fontSize: 40,
  },
});
