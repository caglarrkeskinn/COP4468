import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, FAB, Snackbar} from 'react-native-paper';
import Product from '../Interfaces';
import FavoritesContext from '../FavoritesContext';

const ProductScreen = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorite, setFavorite] = useState<Product[]>([]);
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const {favorites, addToFavorites, removeFromFavorites, checkIsFavorite} =
    useContext(FavoritesContext);

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products').then(res => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = (product: Product) => {
    removeFromFavorites(product);
  };

  const handleFavorite = (product: Product) => {
    addToFavorites(product);
  };
  const handleItemPress = (productId: any) => {
    navigation.navigate('ProductDetail', productId);
  };

  return (
    <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
      <View
        style={{
          backgroundColor: '#3daeaf',
          borderBottomWidth: 10,
          borderBottomColor: '#4876AB',
          alignItems: 'stretch',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          marginBottom: 5,
          flex: 0.5,
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 20,
        }}>
        {selectedProduct && show && (
          <FAB
            icon="arrow-left"
            style={styles.fab2}
            onPress={() => handleItemPress(null)}
          />
        )}
        <Text
          style={{
            flex: 2,
            color: '#FFF',
            fontSize: 35,
            alignSelf: 'center',
            fontWeight: 'bold',
            top: '10%',
          }}>
          Products
        </Text>
        <FAB
          icon="star"
          style={styles.fab}
          onPress={() => navigation.navigate('Favorites')}
        />
      </View>
      {!show && (
        <View style={{flex: 4}}>
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
                    borderBottomColor: 'black',
                    backgroundColor: '#4876AB',
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
                    borderBottomColor: 'black',
                    backgroundColor: '#4876AB',
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
                    onPress={() => handleDelete(item)}>
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
                    onPress={() => handleFavorite(item)}>
                    {checkIsFavorite(item.id) ? (
                      <MaterialCommunityIcons
                        name="star"
                        size={25}
                        color="#4876AB"
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

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{marginBottom: 55, backgroundColor: '#3daeaf'}}
        action={{
          label: 'OK',
          onPress: () => {
            setVisible(false);
          },
        }}>
        Product is deleted!
      </Snackbar>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  fab: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4876AB',
  },
  fab2: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //top: '-50%',
    backgroundColor: '#4876AB',
  },
});
