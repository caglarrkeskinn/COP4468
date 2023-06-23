import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import MyHeader from '../components/MyHeader';
  import axios from 'axios';
  
  type Props = {
    navigation: any;
  };
  
  const AddToCategories = ({navigation}: Props) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDetail, setCategoryDetail] = useState('');
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post(
          'https://northwind.vercel.app/api/categories',
          {
            name: categoryName,
            description: categoryDetail,
          },
        );
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <View style={styles.containerAdd}>
        <MyHeader
          leftIcon="chevron-left"
          onLeftIconPress={() => navigation.goBack()}
          title="Add To Categories"
        />
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={text => setCategoryName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category Detail"
            value={categoryDetail}
            onChangeText={text => setCategoryDetail(text)}
          />
  
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default AddToCategories;
  
  const styles = StyleSheet.create({
    containerAdd: {
      flex: 1,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    input: {
      backgroundColor: 'white',
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#191c2b',
      borderRadius: 30,
      width: 250,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    submitButton: {
      backgroundColor: '#4876AB',
      padding: 12,
      marginBottom: 8,
      borderRadius: 30,
    },
  });
  