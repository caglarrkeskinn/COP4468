import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import AddScreen from '../screens/AddScreen';

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductScreen} />
      <Tab.Screen name="Add Screen" component={AddScreen} />
    </Tab.Navigator>
  );
}

export default MyTab;
