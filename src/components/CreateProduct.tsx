import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Product } from '../types/Product';
import { v4 as uuidv4 } from 'uuid';
import { saveProduct } from '../utils/productStorage';

export function CreateProduct({ navigation }: any) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [unit, setUnit] = useState('');
  const [inStock, setInStock] = useState('');
  const [category, setCategory] = useState('');

  const createProduct = async () => {
    if (!name || !price) return;

    const product: Product = {
      id: uuidv4(),
      name,
      description,
      price: Number(price),
      sku,
      unit,
      inStock: inStock ? Number(inStock) : undefined,
      category,
    };
    
    await saveProduct(product);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter product name"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter product description"
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>SKU</Text>
        <TextInput
          style={styles.input}
          value={sku}
          onChangeText={setSku}
          placeholder="Enter SKU"
        />

        <Text style={styles.label}>Unit</Text>
        <TextInput
          style={styles.input}
          value={unit}
          onChangeText={setUnit}
          placeholder="Enter unit (e.g., piece, kg, hour)"
        />

        <Text style={styles.label}>In Stock</Text>
        <TextInput
          style={styles.input}
          value={inStock}
          onChangeText={setInStock}
          placeholder="Enter stock quantity"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />

        <TouchableOpacity 
          style={[styles.button, !name || !price ? styles.buttonDisabled : null]}
          onPress={createProduct}
          disabled={!name || !price}
        >
          <Text style={styles.buttonText}>Create Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    ...(Platform.OS === 'web' ? { minHeight: '100%' } : {}),
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});