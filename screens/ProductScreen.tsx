import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Product {
  id: any;
  name: string;
  isFavorite: boolean;
}

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products').then(res => {
      setProducts(res.data);
    });
  }, []);
  const handleDelete = (productId: any) => {
    const updatedProducts = products.filter(item => item.id !== productId);
    setProducts(updatedProducts);
  };

  const handleFavorite = (productId: any) => {
    const updatedProducts = products.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#EF9B4A'}}>
      <FlatList
        data={products}
        renderItem={({item}: {item: Product}) => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                flex: 8,
                borderBottomWidth: 2,
                borderRadius: 10,
                borderBottomColor: 'green',
                backgroundColor: 'tomato',
                margin: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => handleDelete(item.id)}>
              <Icon name="trash-o" size={25} color="red" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{flex: 1, alignContent: 'center'}}
              onPress={() => handleFavorite(item.id)}>
              {item.isFavorite ? (
                <Icon name="star" size={25} color="yellow" />
              ) : (
                <Icon name="star-o" size={25} color="gray" />
              )}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item: Product) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
