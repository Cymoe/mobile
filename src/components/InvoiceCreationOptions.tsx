import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { InvoiceTemplate } from '../types/Template';
import { getTemplates } from '../utils/templateStorage';

export function InvoiceCreationOptions({ navigation }: any) {
  const [templates, setTemplates] = useState<InvoiceTemplate[]>([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    const savedTemplates = await getTemplates();
    setTemplates(savedTemplates);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, styles.blankOption]}
        onPress={() => navigation.navigate('CreateInvoice')}
      >
        <div style={{ fontSize: 32, marginBottom: 16 }}>📝</div>
        <Text style={styles.optionTitle}>Create Blank Invoice</Text>
        <Text style={styles.optionDescription}>
          Start from scratch with a blank invoice
        </Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or choose a template</Text>
        <View style={styles.separatorLine} />
      </View>

      <ScrollView style={styles.templateList}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateOption}
            onPress={() => navigation.navigate('CreateInvoice', { template })}
          >
            <View style={styles.templateHeader}>
              <Text style={styles.templateName}>{template.name}</Text>
              <Text style={styles.templateTotal}>
                ${template.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </Text>
            </View>
            {template.description && (
              <Text style={styles.templateDescription}>{template.description}</Text>
            )}
            <Text style={styles.templateItems}>
              {template.items.length} item{template.items.length !== 1 ? 's' : ''}
            </Text>
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
  option: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
  },
  blankOption: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4B5563',
  },
  separatorText: {
    color: '#9CA3AF',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  templateList: {
    flex: 1,
  },
  templateOption: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  templateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F3F4F6',
    flex: 1,
    marginRight: 16,
  },
  templateTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  templateDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  templateItems: {
    fontSize: 14,
    color: '#D1D5DB',
  },
});