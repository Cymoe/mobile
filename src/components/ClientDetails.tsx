import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Client } from '../types/Client';
import { deleteClient } from '../utils/clientStorage';

export function ClientDetails({ route, navigation }: any) {
  const { client } = route.params as { client: Client };

  const handleDelete = async () => {
    await deleteClient(client.id);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('EditClient', { client });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{client.name}</Text>
          {client.company && (
            <Text style={styles.company}>{client.company}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contact Information</Text>
          <Text style={styles.info}>{client.email}</Text>
          {client.phone && <Text style={styles.info}>{client.phone}</Text>}
        </View>

        {client.address && (
          <View style={styles.section}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.info}>{client.address}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Client</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Client</Text>
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
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#4b5563',
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
    marginBottom: 4,
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