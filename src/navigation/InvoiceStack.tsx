import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InvoiceList } from '../screens/InvoiceList';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

// Temporary InvoiceDetail screen
const InvoiceDetail = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Invoice Detail: {route.params.id}</Text>
  </View>
);

export function InvoiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="InvoiceList" 
        component={InvoiceList}
        options={{ 
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F3F4F6'
        }}
      />
      <Stack.Screen 
        name="InvoiceDetail" 
        component={InvoiceDetail}
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
    padding: 16,
  },
  text: {
    color: '#F3F4F6',
    fontSize: 16,
  }
});