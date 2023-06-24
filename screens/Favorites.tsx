import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Product from '../Interfaces';
import FavoritesContext from '../FavoritesContext';
import {Card} from 'react-native-paper';
import MyHeader from '../components/MyHeader';

type Props = {
  navigation: any;
  route: any;
};

const Favorites = ({navigation, route}: Props) => {
  const {favorites, addToFavorites, removeFromFavorites, checkIsFavorite} =
    useContext(FavoritesContext);

  const handleDelete = (product: Product) => {
    removeFromFavorites(product);
  };

  const handleFavorite = (product: Product) => {
    addToFavorites(product);
  };
  const handleItemPress = (product: any) => {
    navigation.navigate('ProductDetail', {
      product: product,
    });
  };
  return (
    <View style={{flex: 4}}>
      <MyHeader
        leftIcon="chevron-left"
        onLeftIconPress={() => navigation.goBack()}
        title="Favorites"
      />
      <FlatList
        data={favorites}
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
              onPress={() => handleItemPress(item)}>
              <Card.Title
                titleStyle={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}
                title={item.name}
              />
            </Card>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                }}
                onPress={() => handleDelete(item)}>
                <MaterialCommunityIcons name="delete" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item: Product) => item.id.toString()}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
