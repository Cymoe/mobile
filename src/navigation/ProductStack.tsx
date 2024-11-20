import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { sampleProducts } from '../utils/sampleData';

const Stack = createNativeStackNavigator();

const ProductList = () => (
  <View style={styles.container}>
    <FlatList
      data={sampleProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.productItem}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}/{item.unit}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

export function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Products" 
        component={ProductList}
        options={{ 
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F3F4F6'
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  name: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  }
});