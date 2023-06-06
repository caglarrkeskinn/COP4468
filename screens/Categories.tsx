import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Categories = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Category Name" />
      <TextInput style={styles.input} placeholder="Category Detail" />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.buttonText}>Add to Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
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
});
