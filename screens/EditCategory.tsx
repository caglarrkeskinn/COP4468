import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import axios from 'axios';
  import MyHeader from '../components/MyHeader';
  
  type Props = {};
  
  interface Category {
    id: number;
    name: string;
    description: string;
    categoryId: number;
  }
  
  const EditCategory = ({navigation, route}: any) => {
    const {category} = route.params;
    const [editName, setEditName] = useState(category.name);
    const [editDetail, setEditDetail] = useState(category.description);
    const updateCategory = async () => {
      try {
        await axios.put(
          `https://northwind.vercel.app/api/categories/${category.id}`,
          {
            name: editName,
            description: editDetail,
          },
        );
        navigation.goBack();
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };
    return (
      <View style={styles.editModalContainer}>
        <MyHeader
          leftIcon="chevron-left"
          onLeftIconPress={() => navigation.goBack()}
          title={category.name}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              bottom: 50,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#4876AB',
            }}>
            Edit Category
          </Text>
          <TextInput
            style={styles.input}
            value={editName}
            onChangeText={text => setEditName(text)}
            placeholder="Category Name"
          />
          <TextInput
            style={styles.input}
            value={editDetail}
            onChangeText={text => setEditDetail(text)}
            placeholder="Category Detail"
          />
          <TouchableOpacity style={styles.updateButton} onPress={updateCategory}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default EditCategory;
  
  const styles = StyleSheet.create({
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
    editModalContainer: {
      flex: 1,
    },
    updateButton: {
      backgroundColor: '#4876AB',
      padding: 12,
      marginTop: 8,
      borderRadius: 30,
    },
  });
  