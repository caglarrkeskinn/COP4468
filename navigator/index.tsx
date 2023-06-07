import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import Categories from '../screens/Categories';
import Orders from '../screens/Orders';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={(color = 'gray')} size={(size = 30)} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon
              name="plus-circle"
              color={(color = 'gray')}
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
          tabBarIcon: ({color, size}) => (
            <Icon name="dollar" color={(color = 'gray')} size={(size = 30)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTab;
