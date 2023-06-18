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
import {Card, FAB, Snackbar} from 'react-native-paper';

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
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products').then(res => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = (productId: any) => {
    const updatedProducts = products.filter(item => item.id !== productId);
    setProducts(updatedProducts);
    setVisible(true);
    
    
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
    <View style={{backgroundColor: '#527a7a', flex: 1}}>
      <View
        style={{
          backgroundColor: '#5c8a8a',
          borderBottomWidth: 10,
          borderBottomColor: '#cc5200',
          alignItems: 'stretch',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          marginBottom: 5,
          flex: 0.5,
          justifyContent: 'space-between',
          flexDirection:'row',
          padding:20
        }}>
           {selectedProduct && show && (
          <FAB
            icon="arrow-left"
            style={styles.fab2}
            onPress={() => handleItemPress(null)}
          />)}
          <Text
          style={{
            flex:2,
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
            onPress={() => setShow(!show)}
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
                    backgroundColor: '#cc5200',
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
                    borderBottomColor: 'black',
                    backgroundColor: '#cc5200',
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
          
          <View style={{marginTop: '10%'}}>
            <Card
              style={{
                flexDirection: 'column',
                backgroundColor: '#cc5200',
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
      <Snackbar
         visible={visible}
         onDismiss={onDismissSnackBar}
         action={{label: 'OK',
           onPress: () => {setVisible(false)},
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
    backgroundColor: '#cc5200',
    
  },
  fab2: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //top: '-50%',
    backgroundColor: '#cc5200',
  },
});
