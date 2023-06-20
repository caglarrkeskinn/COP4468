import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import Categories from '../screens/CategoryList';
import Orders from '../screens/Orders';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4876AB',
        tabBarStyle: {backgroundColor: '#f2f2f2',borderRadius:40,position:'absolute'},
        
      }}>
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={focused ? '#4876AB' : 'black'}
              size={(size = 30)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons
              name="shape-plus"
              color={focused ? '#4876AB' : 'black'}
              size={(size = 30)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons
              name="cart"
              color={focused ? '#4876AB' : 'black'}
              size={(size = 30)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTab;
