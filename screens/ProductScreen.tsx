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

const ProductScreen = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products').then(res => {
      setproducts(res.data);
    });
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={({item}: any) => (
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
            <TouchableOpacity>
              <Text style={{color: 'tomato'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: 'blue'}}>Fav</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>

    // <SafeAreaView>
    //   <View style={{flexDirection: 'row'}}>
    //     <TouchableOpacity>
    //       <Text>Prdouct 1</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={{color: 'tomato'}}>Delete</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={{color: 'blue'}}>Add to Fav</Text>
    //     </TouchableOpacity>
    //   </View>

    //   <View style={{flexDirection: 'row'}}>
    //     <TouchableOpacity>
    //       <Text>Prdouct 2</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={{color: 'tomato'}}>Delete</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={{color: 'blue'}}>Add to Fav</Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
