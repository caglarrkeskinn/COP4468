import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Snackbar} from 'react-native-paper';
import Product from '../Interfaces';
import FavoritesContext from '../FavoritesContext';
import MyHeader from '../components/MyHeader';

const ProductScreen = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const {addToFavorites, removeFromFavorites, checkIsFavorite} =
    useContext(FavoritesContext);

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products').then(res => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = (product: Product) => {
    const updatedProducts = products.filter(item => item.id !== product.id);
    setProducts(updatedProducts);
    if (checkIsFavorite(product.id)) {
      removeFromFavorites(product);
    }
    setVisible(true);
  };

  const handleFavorite = (product: Product) => {
    if (checkIsFavorite(product.id)) {
      removeFromFavorites(product);
    } else addToFavorites(product);
  };

  const handleItemPress = (product: any) => {
    navigation.navigate('ProductDetail', {
      product: product,
    });
  };

  return (
    <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
      <MyHeader
        rightIcon="star"
        onRightIconPress={() => navigation.navigate('Favorites')}
        title="Products"
      />
      <View style={{flex: 3}}>
        <FlatList
          data={products}
          renderItem={({item}: {item: Product}) => (
            <>
              {item.name && (
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
                    onPress={() => handleItemPress(item)}>
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
            </>
          )}
          keyExtractor={(item: Product) => item.id.toString()}
        />
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{marginBottom: 20, backgroundColor: '#3daeaf'}}
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
    backgroundColor: '#4876AB',
  },
});
