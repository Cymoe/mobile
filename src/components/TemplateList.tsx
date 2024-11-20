import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { InvoiceTemplate } from '../types/Template';
import { getTemplates } from '../utils/templateStorage';
import { initializeSampleData } from '../utils/sampleData';

export function TemplateList({ navigation }: any) {
  const [templates, setTemplates] = useState<InvoiceTemplate[]>([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    const savedTemplates = await getTemplates();
    if (savedTemplates.length === 0) {
      await initializeSampleData();
      const initializedTemplates = await getTemplates();
      setTemplates(initializedTemplates);
    } else {
      setTemplates(savedTemplates);
    }
  };

  const useTemplate = (template: InvoiceTemplate) => {
    navigation.navigate('CreateInvoice', { template });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateTemplate')}
      >
        <Text style={styles.buttonText}>Create New Template</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {templates.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No templates yet</Text>
            <Text style={styles.emptySubtext}>Create your first template to speed up invoice creation</Text>
          </View>
        ) : (
          templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateItem}
              onPress={() => navigation.navigate('TemplateDetails', { template })}
            >
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>{template.name}</Text>
                {template.description && (
                  <Text style={styles.description}>{template.description}</Text>
                )}
                <Text style={styles.itemCount}>
                  {template.items.length} item{template.items.length !== 1 ? 's' : ''}
                </Text>
                <Text style={styles.totalAmount}>
                  Total: ${template.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.useButton}
                onPress={() => useTemplate(template)}
              >
                <Text style={styles.useButtonText}>Use Template</Text>
              </TouchableOpacity>
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
    textAlign: 'center',
  },
  templateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  templateInfo: {
    flex: 1,
    marginRight: 16,
  },
  templateName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#F3F4F6',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  useButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  useButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});