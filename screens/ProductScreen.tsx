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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

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
  const [favorite, setFavorite] = useState<Product[]>([]);
  const [show, setShow] = useState(true);

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
    const updatedFavorites = updatedProducts.filter(item => item.isFavorite);

    setProducts(updatedProducts);
    setFavorite(updatedFavorites);
  };
  const handleItemPress = (productId: any) => {
    const selectedProduct = products.find(item => item.id === productId);
    setSelectedProduct(selectedProduct || null);
  };

  return (
    <View style={{backgroundColor: '#EF9B4A', flex: 1}}>
      <View
        style={{
          borderBottomWidth: 3,
          borderBottomColor: 'green',
          alignItems: 'center',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: 'tomato',
          marginBottom: 5,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 35,
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          Products
        </Text>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderEndColor: 'black',
            borderRadius: 10,
            alignSelf: 'flex-end',
            top: '-40%',
            right: '2%',
          }}
          onPress={() => setShow(!show)}>
          <Icon style={{margin: 5}} name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {!show && (
        <View style={{flex: 3}}>
          <FlatList
            data={favorite}
            renderItem={({item}: {item: Product}) => (
              <View style={{flexDirection: 'row'}}>
                <Card
                  style={{
                    padding: 5,
                    flex: 8,
                    borderBottomWidth: 2,
                    borderRadius: 10,
                    borderBottomColor: 'green',
                    backgroundColor: 'tomato',
                    margin: 5,
                  }}
                  onPress={() => handleItemPress(item.id)}>
                  <Card.Title
                    titleStyle={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                    title={item.name}
                  />
                  {show && (
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                        }}
                        onPress={() => handleDelete(item.id)}>
                        <MaterialCommunityIcons
                          name="delete"
                          size={25}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                        }}
                        onPress={() => handleFavorite(item.id)}>
                        {item.isFavorite ? (
                          <MaterialCommunityIcons
                            name="star"
                            size={25}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="star-outline"
                            size={25}
                            color="black"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </Card>
              </View>
            )}
            keyExtractor={(item: Product) => item.id.toString()}
          />
        </View>
      )}
      {!selectedProduct && show && (
        <View style={{flex: 3}}>
          <FlatList
            data={products}
            renderItem={({item}: {item: Product}) => (
              <View style={{flexDirection: 'row'}}>
                <Card
                  style={{
                    padding: 5,
                    flex: 8,
                    borderBottomWidth: 2,
                    borderRadius: 10,
                    borderBottomColor: 'green',
                    backgroundColor: 'tomato',
                    margin: 5,
                  }}
                  onPress={() => handleItemPress(item.id)}>
                  <Card.Title
                    titleStyle={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                    title={item.name}></Card.Title>
                </Card>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                    }}
                    onPress={() => handleDelete(item.id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                    }}
                    onPress={() => handleFavorite(item.id)}>
                    {item.isFavorite ? (
                      <MaterialCommunityIcons
                        name="star"
                        size={25}
                        color="black"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="star-outline"
                        size={25}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item: Product) => item.id.toString()}
          />
        </View>
      )}
      {selectedProduct && show && (
        <View style={{flex: 3}}>
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
          <View style={{marginTop: '10%'}}>
            <Card
              style={{
                flexDirection: 'column',
                backgroundColor: 'red',
              }}>
              <Card.Title
                title={selectedProduct.name}
                titleStyle={{color: 'white', fontWeight: 'bold'}}
              />

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>Product ID:</Text>
                <Text style={{textAlign: 'center'}}>{selectedProduct.id}</Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Supplier ID:</Text>
                <Text>{selectedProduct.supplierId}</Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Category ID:</Text>
                <Text>{selectedProduct.categoryId}</Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Quantity Per Unit:</Text>
                <Text>{selectedProduct.quantityPerUnit}</Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>Unit Price:</Text>
                <Text style={{textAlign: 'center'}}>
                  {selectedProduct.unitPrice}
                </Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>Units In Stock:</Text>
                <Text style={{textAlign: 'center'}}>
                  {selectedProduct.unitsInStock}
                </Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>Units In Order:</Text>
                <Text style={{textAlign: 'center'}}>
                  {selectedProduct.unitsOnOrder}
                </Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>Reorder Level:</Text>
                <Text style={{textAlign: 'center'}}>
                  {selectedProduct.reorderLevel}
                </Text>
              </Card.Content>

              <Card.Content
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>Discontinued:</Text>
                <Text style={{textAlign: 'center'}}>
                  {selectedProduct.discontinued.toString()}
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
