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
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={({item}: {item: Product}) => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text
                style={{
                  margin: 5,
                  fontSize: 15,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{color: 'tomato'}}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleFavorite(item.id)}>
              <Text style={{color: item.isFavorite ? 'blue' : 'black'}}>
                Favorite
              </Text>
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
