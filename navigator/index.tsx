import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen';
import CategoriesScreen from '../screens/CategoryList';
import Orders from '../screens/Orders';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Favorites from '../screens/Favorites';
import ProductDetail from '../screens/ProductDetail';
import EditCategory from '../screens/EditCategory';
import AddToCategories from '../screens/AddToCategories';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type Screen = {
  name: string;
  component: React.ComponentType<any>;
};

const Router = () => {
  const screens: Screen[] = [
    {name: 'Products', component: ProductScreen},
    {name: 'Categories', component: CategoriesScreen},
    {name: 'Orders', component: Orders},
  ];

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="App">
        {() => (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, size, color}) => {
                let iconName = '';

                if (route.name === 'Products') {
                  iconName = 'format-list-bulleted';
                } else if (route.name === 'Categories') {
                  iconName = 'shape-plus';
                } else if (route.name === 'Orders') {
                  iconName = 'cart';
                }

                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    color={color}
                    size={(size = 30)}
                  />
                );
              },
              tabBarActiveTintColor: '#4876AB',
              tabBarInactiveTintColor: 'gray',
              tabBarShowLabel: false,
              tabBarStyle: {
                padding: 5,
                borderTopWidth: 1,
                borderColor: 'black',
              },
            })}>
            {screens.map((screen: Screen) => (
              <Tab.Screen
                options={{headerShown: false}}
                key={screen.name}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Favorites"
        options={{title: 'Favorites'}}
        component={Favorites}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{title: 'ProductDetail'}}
        component={ProductDetail}
      />
      <Stack.Screen
        name="EditCategory"
        options={{title: 'EditCategory'}}
        component={EditCategory}
      />
      <Stack.Screen
        name="AddToCategories"
        options={{title: 'AddToCategories'}}
        component={AddToCategories}
      />
    </Stack.Navigator>
  );
};

export default Router;
const styles = StyleSheet.create({});
