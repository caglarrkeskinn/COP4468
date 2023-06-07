import {
  FlatList,
  InteractionManager,
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
  supplierId: any;
  categoryId: any;
  quantityPerUnit: any;
  unitPrice: any;
  unitsInStock: any;
  unitsOnOrder: any;
  reorderLevel: any;
  discontinued: boolean;
  name: string;
  isFavorite: boolean;
}

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
  const handleItemPress = (productId: any) => {
    const selectedProduct = products.find(item => item.id === productId);
    setSelectedProduct(selectedProduct || null);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#EF9B4A'}}>
      {!selectedProduct && (
        <FlatList
          data={products}
          renderItem={({item}: {item: Product}) => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  padding: 12,
                  flex: 8,
                  borderBottomWidth: 2,
                  borderRadius: 10,
                  borderBottomColor: 'green',
                  backgroundColor: 'tomato',
                  margin: 5,
                  alignItems: 'center',
                }}
                onPress={() => handleItemPress(item.id)}>
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
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                  borderRightWidth: 2,
                  borderEndColor: 'black',
                  borderRadius: 10,
                  height: 50,
                }}
                onPress={() => handleDelete(item.id)}>
                <Icon
                  style={{fontSize: 38, margin: 1}}
                  name="trash-o"
                  size={25}
                  color="red"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                  borderRightWidth: 2,
                  borderEndColor: 'black',
                  borderRadius: 10,
                  marginEnd: 5,
                }}
                onPress={() => handleFavorite(item.id)}>
                {item.isFavorite ? (
                  <Icon
                    style={{fontSize: 30, margin: 1}}
                    name="star"
                    size={25}
                    color="#FFDF40"
                  />
                ) : (
                  <Icon
                    style={{fontSize: 30, margin: 1}}
                    name="star"
                    size={25}
                    color="gray"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item: Product) => item.id.toString()}
        />
      )}
      {selectedProduct && (
        <>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              borderRightWidth: 2,
              borderEndColor: 'black',
              marginBottom: 5,
              marginLeft: 5,
              borderRadius: 10,
            }}
            onPress={() => handleItemPress(null)}>
            <Icon
              style={{margin: 3}}
              name="arrow-left"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 2,
              borderEndWidth: 2,
              borderRadius: 10,
              borderBottomColor: 'black',
              borderEndColor: 'black',
              backgroundColor: 'tomato',
              margin: 5,
              marginVertical: '25%',
              marginBottom: '100%',
              padding: 10,
              alignItems: 'stretch',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Product ID:</Text>
              <Text style={{textAlign: 'center'}}>{selectedProduct.id}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Supplier ID:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.supplierId}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Category ID:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.categoryId}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Quantity Per Unit:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.quantityPerUnit}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Unit Price:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.unitPrice}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Units In Stock:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.unitsInStock}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Units In Order:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.unitsOnOrder}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Reorder Level:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.reorderLevel}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Discontinued:</Text>
              <Text style={{textAlign: 'center'}}>
                {selectedProduct.discontinued.toString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                marginBottom: 2,
              }}>
              <Text style={{textAlign: 'center'}}>Product Name:</Text>
              <Text style={{textAlign: 'center', flexWrap: 'wrap'}}>
                {selectedProduct.name}
              </Text>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
