import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreens/ProductScreen';
import Categories from '../screens/CategoryScreens/CategoryList';
import Orders from '../screens/Orders';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="list"
              color={focused ? 'orange' : 'gray'}
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
            <Icon
              name="plus-circle"
              color={focused ? 'orange' : 'gray'}
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
            <Icon
              name="dollar"
              color={focused ? 'orange' : 'gray'}
              size={(size = 30)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTab;
