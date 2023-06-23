import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ProductScreen from './ProductScreen';
import React, {useState} from 'react';
import MyHeader from '../components/MyHeader';

const Orders = () => {
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <MyHeader title="Orders" />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
