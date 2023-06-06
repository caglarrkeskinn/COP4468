import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ProductDetail = ({route}: any) => {
  let {id} = route.params;
  const [detail, setdetail] = useState<any>({});

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products/' + id).then(res => {
      setdetail(res.data);
    });
  }, []);

  return (
    <View>
      <Text style={{fontSize: 35}}>
        {'name'}: {detail.name}
      </Text>
      <Text style={{fontSize: 35}}>
        {'unitprice'}: {detail.unitPrice}
      </Text>
      <Text style={{fontSize: 35}}>
        {'stock'}: {detail.unitsInStock}
      </Text>
    </View>
  );
};

export default ProductDetail;
