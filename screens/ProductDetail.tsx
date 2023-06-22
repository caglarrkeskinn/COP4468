import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import Product from '../Interfaces';

const ProductDetail = (selectedProduct: Product) => {
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: '10%'}}>
        <Card
          style={{
            flexDirection: 'column',
            backgroundColor: '#4876AB',
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
            <Text style={{textAlign: 'center'}}></Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
