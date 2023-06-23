import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Snackbar} from 'react-native-paper';
import MyHeader from '../components/MyHeader';
import {useIsFocused} from '@react-navigation/native';

interface Category {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

const CategoriesScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    if (isFocused) {
      setRerenderKey(prevKey => prevKey + 1);
      fetchCategories();
    }
  }, [isFocused]);

  const onDismissSnackBar = () => setVisible(false);

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
      setVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View key={rerenderKey} style={{backgroundColor: '#f2f2f2', flex: 1}}>
      <MyHeader
        rightIcon="plus"
        onRightIconPress={() => navigation.navigate('AddToCategories')}
        title="Category"
      />

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
                  borderBottomColor: 'black',
                  backgroundColor: '#4876AB',
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
                  onPress={() =>
                    navigation.navigate('EditCategory', {category: item})
                  }>
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            setVisible(false);
          },
        }}>
        Category is deleted!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EF9B4A',
    flex: 6,
  },
  fab: {
    width: 40,
    height: 40,
    justifyContent: 'center',

    alignItems: 'center',
    //top: '-40%',
    //left: '40%',
    backgroundColor: '#4876AB',
  },
  fab2: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //top: '-50%',
    backgroundColor: '#4876AB',
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
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
  categoryContainer: {
    flexDirection: 'row',
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  updateButton: {
    backgroundColor: '#4876AB',
    padding: 12,
    marginTop: 8,
    borderRadius: 30,
  },
});

export default CategoriesScreen;
