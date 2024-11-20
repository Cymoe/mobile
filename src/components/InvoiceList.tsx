import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Invoice } from '../types/Invoice';
import { getInvoices } from '../utils/storage';
import { initializeSampleData } from '../utils/sampleData';

export function InvoiceList({ navigation }: any) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    let savedInvoices = await getInvoices();
    if (savedInvoices.length === 0) {
      await initializeSampleData();
      savedInvoices = await getInvoices();
    }
    setInvoices(savedInvoices);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('InvoiceCreationOptions')}
      >
        <div style={{ fontSize: 24, color: 'white', marginRight: 8 }}>➕</div>
        <Text style={styles.buttonText}>Create New Invoice</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {invoices.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No invoices yet</Text>
            <Text style={styles.emptySubtext}>Create your first invoice to get started</Text>
          </View>
        ) : (
          invoices.map((invoice) => (
            <TouchableOpacity
              key={invoice.id}
              style={styles.invoiceItem}
              onPress={() => navigation.navigate('InvoiceDetails', { invoice })}
            >
              <View>
                <Text style={styles.customerName}>{invoice.customerName}</Text>
                <Text style={styles.dueDate}>Due: {invoice.dueDate}</Text>
              </View>
              <View>
                <Text style={styles.total}>${invoice.total.toFixed(2)}</Text>
                <Text style={[
                  styles.status,
                  invoice.status === 'paid' ? styles.paid : styles.pending
                ]}>
                  {invoice.status.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  dueDate: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 4,
    color: '#F3F4F6',
  },
  status: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
  },
  paid: {
    color: '#34D399',
  },
  pending: {
    color: '#FBBF24',
  },
});