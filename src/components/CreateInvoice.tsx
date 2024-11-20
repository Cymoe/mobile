import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Invoice, InvoiceItem } from '../types/Invoice';
import { Product } from '../types/Product';
import { Client } from '../types/Client';
import { v4 as uuidv4 } from 'uuid';
import { saveInvoice } from '../utils/storage';
import { getProducts } from '../utils/productStorage';
import { getClients } from '../utils/clientStorage';

export function CreateInvoice({ navigation }: any) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [dueDate, setDueDate] = useState('Due on receipt');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('');
  const [showProductList, setShowProductList] = useState(false);
  const [showClientList, setShowClientList] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [savedProducts, savedClients] = await Promise.all([
      getProducts(),
      getClients()
    ]);
    setProducts(savedProducts);
    setClients(savedClients);
  };

  const addItem = () => {
    if (!selectedProduct || !quantity) return;
    
    const total = Number(quantity) * selectedProduct.price;
    const newItem: InvoiceItem = {
      description: selectedProduct.name,
      quantity: Number(quantity),
      price: selectedProduct.price,
      total
    };
    setItems([...items, newItem]);
    setSelectedProduct(null);
    setQuantity('');
    setShowProductList(false);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const createInvoice = async () => {
    if (!selectedClient || items.length === 0) return;

    const invoice: Invoice = {
      id: uuidv4(),
      customerName: selectedClient.name,
      date: new Date().toISOString(),
      dueDate,
      items,
      total: items.reduce((sum, item) => sum + item.total, 0),
      status: 'pending'
    };
    
    await saveInvoice(invoice);
    navigation.navigate('InvoiceList');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Select Client *</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowClientList(!showClientList)}
        >
          <Text style={styles.selectorText}>
            {selectedClient ? selectedClient.name : 'Select a client'}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {showClientList && (
          <View style={styles.dropdownList}>
            {clients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedClient(client);
                  setShowClientList(false);
                }}
              >
                <Text style={styles.dropdownItemTitle}>{client.name}</Text>
                {client.company && (
                  <Text style={styles.dropdownItemSubtitle}>{client.company}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Due Date</Text>
        <View style={styles.dueDateContainer}>
          <Text style={styles.dueDate}>Due on receipt</Text>
        </View>

        <Text style={styles.sectionTitle}>Add Items</Text>
        
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowProductList(!showProductList)}
        >
          <Text style={styles.selectorText}>
            {selectedProduct ? selectedProduct.name : 'Select a product'}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {showProductList && (
          <View style={styles.dropdownList}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedProduct(product);
                  setShowProductList(false);
                }}
              >
                <Text style={styles.dropdownItemTitle}>{product.name}</Text>
                <Text style={styles.dropdownItemSubtitle}>
                  ${product.price.toFixed(2)} / {product.unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedProduct && (
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.quantityInput]}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Quantity"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
            />
            <TouchableOpacity 
              style={[styles.button, styles.addButton]} 
              onPress={addItem}
              disabled={!quantity}
            >
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        )}

        {items.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Items</Text>
            <View style={styles.itemsList}>
              {items.map((item, index) => (
                <View key={index} style={styles.item}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemSubtext}>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.itemActions}>
                    <Text style={styles.itemTotal}>${item.total.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => removeItem(index)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity 
          style={[styles.button, styles.createButton]} 
          onPress={createInvoice}
          disabled={!selectedClient || items.length === 0}
        >
          <Text style={styles.buttonText}>Create Invoice</Text>
        </TouchableOpacity>
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
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: '#F3F4F6',
  },
  input: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
    fontSize: 16,
    color: '#F3F4F6',
  },
  dueDateContainer: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  dueDate: {
    fontSize: 16,
    color: '#F3F4F6',
  },
  selector: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    color: '#F3F4F6',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  dropdownList: {
    backgroundColor: '#374151',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
    maxHeight: 200,
    overflow: 'scroll',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  dropdownItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  dropdownItemSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  quantityInput: {
    flex: 1,
    marginBottom: 0,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  addButton: {
    backgroundColor: '#22c55e',
  },
  createButton: {
    backgroundColor: '#8B5CF6',
    marginTop: 24,
    padding: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsList: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 16,
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
    color: '#F3F4F6',
    marginBottom: 4,
  },
  itemSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  itemActions: {
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  removeButton: {
    color: '#EF4444',
    fontSize: 14,
  },
});