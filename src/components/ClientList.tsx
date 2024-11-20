import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Client } from '../types/Client';
import { getClients } from '../utils/clientStorage';
import { initializeSampleData } from '../utils/sampleData';

export function ClientList({ navigation }: any) {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    let savedClients = await getClients();
    if (savedClients.length === 0) {
      await initializeSampleData();
      savedClients = await getClients();
    }
    setClients(savedClients);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateClient')}
      >
        <div style={{ fontSize: 24, color: 'white', marginRight: 8 }}>➕</div>
        <Text style={styles.buttonText}>Add New Client</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {clients.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No clients yet</Text>
            <Text style={styles.emptySubtext}>Add your first client to get started</Text>
          </View>
        ) : (
          clients.map((client) => (
            <TouchableOpacity
              key={client.id}
              style={styles.clientItem}
              onPress={() => navigation.navigate('ClientDetails', { client })}
            >
              <View>
                <Text style={styles.clientName}>{client.name}</Text>
                {client.company && (
                  <Text style={styles.companyName}>{client.company}</Text>
                )}
                <Text style={styles.email}>{client.email}</Text>
              </View>
              <Text style={styles.viewDetails}>View Details →</Text>
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
  clientItem: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#F3F4F6',
  },
  companyName: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  viewDetails: {
    marginTop: 8,
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
});