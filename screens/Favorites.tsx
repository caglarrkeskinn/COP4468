import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Product from '../Interfaces';
import FavoritesContext from '../FavoritesContext';

type Props = {};

const Favorites = (props: Props) => {
  const {favorites, addToFavorites, removeFromFavorites, checkIsFavorite} =
    useContext(FavoritesContext);
  const handleDelete = (product: Product) => {
    removeFromFavorites(product);
  };

  const handleFavorite = (product: Product) => {
    addToFavorites(product);
  };
  return (
    <View style={{flex: 1}}>
      {favorites.map((product: Product) => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
            }}
            onPress={() => handleDelete(product)}>
            <MaterialCommunityIcons name="delete" size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
            }}
            onPress={() => handleFavorite(product)}>
            {checkIsFavorite(product.id) ? (
              <MaterialCommunityIcons name="star" size={25} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="star-outline"
                size={25}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
