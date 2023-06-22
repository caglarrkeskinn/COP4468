import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTab from './navigator/index';
import FavoritesProvider from './FavoritesProvider';

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <MyTab />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
