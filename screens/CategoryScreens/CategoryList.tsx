import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput,Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Category {
    id: number;
    name: string;
    categoryId: number; // Assuming `categoryId` is the correct property name for the category ID
  }
const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://northwind.vercel.app/api/categories');
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`https://northwind.vercel.app/api/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };
  const [categoryName, setCategoryName] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://northwind.vercel.app/api/categories', {
        name: categoryName,
        description: categoryDetail
      });
      console.log(response.data);
      
      setCategoryName('');
      setCategoryDetail('');
    } catch (error) {
      console.error(error);
    }
  };

  const renderCategory = ({ item }: any) => {
    console.log(item);
    return (
      
       
      <View style={styles.categoryContainer}>
        <View style={styles.categoryName}>
        <Text style={{fontSize: 15,fontWeight: 'bold',color: 'white'}}>{item.name}</Text>
        <Text >{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={{justifyContent:'center'}}
          onPress={() => deleteCategory(item.id)} >
          <Icon name="trash-o" size={25} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
          style={{justifyContent:'center'}}
          onPress={() => console.log('Update button pressed')}>
          <Icon name="pencil-square-o" size={25} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      
    );
  };

  const AddCategories = () => {
    
    return (
      <View style={styles.containerAdd}>
        <TextInput style={styles.input} 
        placeholder="Category Name" 
        value={categoryName} 
        onChangeText={text => setCategoryName(text)}/>
        <TextInput style={styles.input} 
        placeholder="Category Detail"
        value={categoryDetail} 
        onChangeText={text => setCategoryDetail(text)} />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
         <Text style={styles.buttonText}>Add to Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setShow(!show)} style={styles.submitButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const [show,setShow]=useState(false)
  

  return (
    <>
    <View>
      
    <TouchableOpacity style={{marginBottom:'5%',
        marginHorizontal:'80%',
        padding:'1%',
        width:50,
        backgroundColor:'green',
        borderRadius:6}}
      onPress={()=> setShow(!show)}>
      <Text style={{padding:5}}>ADD</Text></TouchableOpacity>
    </View>
    <View style={styles.container}>
      
      {(show)&&
      <View>
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item: Category) => item.id.toString()}
      /></View>}
      {(!show)&&
        AddCategories()
      }
    </View>
    </>
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#EF9B4A',
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
   containerAdd: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
    backgroundColor: '#EF9B4A',
   },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#191c2b',
    padding: 12,
    marginBottom: 8,
    borderRadius: 30,
  },
  categoryContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryName: {
      flex: 8,
      borderBottomWidth: 2,
      borderRadius: 10,
      borderBottomColor: 'green',
      backgroundColor: 'tomato',
      margin: 5,
      alignItems: 'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default CategoriesScreen;
