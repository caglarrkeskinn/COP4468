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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

interface Category {
  id: number;
  name: string;
  description: string;
  categoryId: number;
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

  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <View style={{backgroundColor: '#EF9B4A', flex: 1}}>
      <View
        style={{
          borderBottomWidth: 3,
          borderBottomColor: 'green',
          alignItems: 'center',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: 'tomato',
          marginBottom: 5,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 35,
            alignSelf: 'center',
            top: '10%',
            fontWeight: 'bold',
          }}>
          Category
        </Text>

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderEndColor: 'black',
            borderRadius: 10,
            alignSelf: 'flex-end',
            top: '-40%',
            right: '2%',
          }}
          onPress={() => setShow(false)}>
          <Icon style={{margin: 5}} name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {show && (
        <View style={{flex: 3}}>
          <FlatList
            data={categories}
            renderItem={({item}: {item: Category}) => (
              <View style={styles.categoryContainer}>
                <Card
                  style={{
                    padding: 5,
                    flex: 8,
                    borderBottomWidth: 2,
                    borderRadius: 10,
                    borderBottomColor: 'green',
                    backgroundColor: 'tomato',
                    margin: 5,
                  }}>
                  <Card.Title
                    titleStyle={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                    title={item.name}></Card.Title>
                  <Text>{item.description}</Text>
                </Card>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() => deleteCategory(item.id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() => handleEdit(item)}>
                    <MaterialCommunityIcons
                      name="pencil-box-multiple"
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item: Category) => item.id.toString()}
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
      {!show && !showEditModal && (
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

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add to Categories</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EF9B4A',
    flex: 6,
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
