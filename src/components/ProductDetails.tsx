import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Product } from '../types/Product';
import { deleteProduct } from '../utils/productStorage';

export function ProductDetails({ route, navigation }: any) {
  const { product } = route.params as { product: Product };

  const handleDelete = async () => {
    await deleteProduct(product.id);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('EditProduct', { product });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        {product.description && (
          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.info}>{product.description}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Details</Text>
          <View style={styles.detailsGrid}>
            {product.sku && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>SKU</Text>
                <Text style={styles.detailValue}>{product.sku}</Text>
              </View>
            )}
            {product.unit && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Unit</Text>
                <Text style={styles.detailValue}>{product.unit}</Text>
              </View>
            )}
            {product.inStock !== undefined && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>In Stock</Text>
                <Text style={styles.detailValue}>{product.inStock}</Text>
              </View>
            )}
            {product.category && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{product.category}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Product</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Product</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#3b82f6',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  info: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  editButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#ef4444',
  },
});