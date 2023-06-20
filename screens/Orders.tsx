import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ProductScreen from './ProductScreen';
import React, {useState} from 'react';

const Orders = () => {
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
       <View
        style={{
          borderBottomWidth: 10,
          borderBottomColor: '#4876AB',
          alignItems: 'stretch',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: '#42CBC8',
          marginBottom: 5,
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
           <Text
            style={{
              color: '#FFF',
              fontSize: 35,
              alignSelf: 'center',
              top: '10%',
              fontWeight: 'bold'}}>Orders
            </Text>
        </View>
     
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
