import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { sampleTemplates } from '../utils/sampleData';

const Stack = createNativeStackNavigator();

const TemplateList = () => (
  <View style={styles.container}>
    <FlatList
      data={sampleTemplates}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.templateItem}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

export function TemplateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Templates" 
        component={TemplateList}
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
  templateItem: {
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
  }
});