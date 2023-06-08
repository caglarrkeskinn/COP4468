import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Category {
  id: number;
  name: string;
  description: string;
  categoryId: number; // Assuming `categoryId` is the correct property name for the category ID
}

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');
  const [show, setShow] = useState(true);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editDetail, setEditDetail] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://northwind.vercel.app/api/categories',
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(
        `https://northwind.vercel.app/api/categories/${categoryId}`,
      );
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://northwind.vercel.app/api/categories',
        {
          name: categoryName,
          description: categoryDetail,
        },
      );
      setCategoryName('');
      setCategoryDetail('');
      fetchCategories();
      setShow(!show);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setEditName(category.name);
    setEditDetail(category.description);
    setShowEditModal(true);
    setShow(false);
  };

  const updateCategory = async () => {
    try {
      if (editCategory) {
        await axios.put(
          `https://northwind.vercel.app/api/categories/${editCategory.id}`,
          {
            name: editName,
            description: editDetail,
          },
        );
        setShowEditModal(false);
        setShow(true);
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCategory = ({item}: {item: Category}) => {
    return (
      
      <View style={styles.categoryContainer}>
        
        <View style={styles.categoryName}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
            {item.name}
          </Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => deleteCategory(item.id)}>
            <MaterialCommunityIcons name="delete" size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => handleEdit(item)}>
            <MaterialCommunityIcons name="pencil-box-multiple" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AddCategories = () => {
    return (
      <>
        <View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              borderRightWidth: 2,
              borderEndColor: 'black',
              marginBottom: 5,
              marginLeft: 5,
              borderRadius: 10,
              margin: -30,
            }}
            onPress={() => setShow(!show)}>
            <Icon
              style={{margin: 3}}
              name="arrow-left"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerAdd}>
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
            <Text style={styles.buttonText}>Add to Categories</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
    
      <View style={styles.container}>
      <View style={{borderBottomWidth: 3,
        borderBottomColor: "green",
        alignItems: "center",
        //textAlign: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "tomato",
        marginBottom:5,
        height: 150}}/>
        <Text style={{color: "#FFF",
        fontSize: 35,
        alignSelf: "center",
        fontWeight: "bold",
        top:-100
        }}>Category</Text>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderEndColor: 'black',
            marginBottom: 5,
            marginHorizontal: '90%',
            //left: '90%',
            borderRadius: 10,
            margin: -50,
          }}
          onPress={() => setShow(false)}>
          <Icon style={{margin: 5}} name="plus" size={20} color="black" />
        </TouchableOpacity>
        {show && (
          <View>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        )}
        {showEditModal && (
          <View style={styles.editModalContainer}>
            <Text>Edit Category</Text>
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
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updateCategory}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
        {!show && !showEditModal && <AddCategories />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EF9B4A',
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
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF9B4A',
  },
  updateButton: {
    backgroundColor: '#191c2b',
    padding: 12,
    marginTop: 8,
    borderRadius: 30,
  },
});

export default CategoriesScreen;
