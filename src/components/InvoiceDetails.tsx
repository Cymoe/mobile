import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Invoice } from '../types/Invoice';
import { updateInvoice } from '../utils/storage';

export function InvoiceDetails({ route, navigation }: any) {
  const { invoice } = route.params as { invoice: Invoice };

  const markAsPaid = async () => {
    const updatedInvoice = { ...invoice, status: 'paid' as const };
    await updateInvoice(updatedInvoice);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.customerName}>{invoice.customerName}</Text>
            <Text style={styles.date}>Created: {new Date(invoice.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[
              styles.status,
              invoice.status === 'paid' ? styles.paid : styles.pending
            ]}>
              {invoice.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Due Date</Text>
          <Text style={styles.sectionContent}>{invoice.dueDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemQuantity}>
                  {item.quantity} x ${item.price.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.itemTotal}>${item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${invoice.total.toFixed(2)}</Text>
        </View>

        {invoice.status === 'pending' && (
          <TouchableOpacity style={styles.paidButton} onPress={markAsPaid}>
            <Text style={styles.buttonText}>Mark as Paid</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  contentContainer: {
    padding: 16,
    ...(Platform.OS === 'web' ? { minHeight: '100%' } : {}),
  },
  card: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
    paddingBottom: 16,
  },
  customerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#F3F4F6',
  },
  date: {
    color: '#9CA3AF',
  },
  statusContainer: {
    backgroundColor: '#1F2937',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  paid: {
    color: '#34D399',
  },
  pending: {
    color: '#FBBF24',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#F3F4F6',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  itemDetails: {
    flex: 1,
    marginRight: 16,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#F3F4F6',
  },
  itemQuantity: {
    color: '#9CA3AF',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  paidButton: {
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});