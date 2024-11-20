import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { sampleInvoices } from '../utils/sampleData';

export function InvoiceList({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.invoiceItem}
            onPress={() => navigation.navigate('InvoiceDetail', { id: item.id })}
          >
            <View>
              <Text style={styles.customerName}>{item.customerName}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
              <Text style={styles.amount}>${item.total}</Text>
              <Text style={[styles.status, styles[item.status]]}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  invoiceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  customerName: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  amount: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
  paid: {
    color: '#34D399',
  },
  pending: {
    color: '#FBBF24',
  }
}); 