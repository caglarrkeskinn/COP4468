import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import Product from '../Interfaces';
import MyHeader from '../components/MyHeader';

const ProductDetail = ({route, navigation}: any) => {
  const {product} = route.params;
  return (
    <View style={{flex: 1}}>
      <MyHeader
        leftIcon="chevron-left"
        onLeftIconPress={() => navigation.goBack()}
        title={product.name}
      />
      <View style={{marginTop: 2}}>
        <Card
          style={{
            flexDirection: 'column',
            backgroundColor: '#4876AB',
          }}>
          <Card.Title
            title={product.name}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
          />

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center'}}>Product ID:</Text>
            <Text style={{textAlign: 'center'}}>{product.id}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Supplier ID:</Text>
            <Text>{product.supplierId}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Category ID:</Text>
            <Text>{product.categoryId}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Quantity Per Unit:</Text>
            <Text>{product.quantityPerUnit}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center'}}>Unit Price:</Text>
            <Text style={{textAlign: 'center'}}>{product.unitPrice}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center'}}>Units In Stock:</Text>
            <Text style={{textAlign: 'center'}}>{product.unitsInStock}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center'}}>Units In Order:</Text>
            <Text style={{textAlign: 'center'}}>{product.unitsOnOrder}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center'}}>Reorder Level:</Text>
            <Text style={{textAlign: 'center'}}>{product.reorderLevel}</Text>
          </Card.Content>

          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center'}}>Discontinued:</Text>
            <Text style={{textAlign: 'center'}}></Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
