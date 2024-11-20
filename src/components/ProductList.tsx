import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Product } from '../types/Product';
import { getProducts } from '../utils/productStorage';
import { initializeSampleData } from '../utils/sampleData';

export function ProductList({ navigation }: any) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    let savedProducts = await getProducts();
    if (savedProducts.length === 0) {
      await initializeSampleData();
      savedProducts = await getProducts();
    }
    setProducts(savedProducts);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateProduct')}
      >
        <div style={{ fontSize: 24, color: 'white', marginRight: 8 }}>➕</div>
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { product })}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                {product.description && (
                  <Text style={styles.description} numberOfLines={2}>
                    {product.description}
                  </Text>
                )}
                <Text style={styles.unit}>
                  ${product.price.toFixed(2)} / {product.unit}
                </Text>
              </View>
              {product.category && (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1F2937',
    ...(Platform.OS === 'web' ? { height: '100%' } : {}),
  },
  createButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  productCard: {
    backgroundColor: '#374151',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  cardContent: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  unit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#1F2937',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  categoryText: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '500',
  },
});