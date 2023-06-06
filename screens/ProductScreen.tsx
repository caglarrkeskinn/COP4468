import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ProductScreen = () => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text>Prdouct 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'tomato'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'blue'}}>Add to Fav</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text>Prdouct 2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'tomato'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'blue'}}>Add to Fav</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
