import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardStack } from './navigation/DashboardStack';
import { InvoiceStack } from './navigation/InvoiceStack';
import { ClientStack } from './navigation/ClientStack';
import { ProductStack } from './navigation/ProductStack';
import { TemplateStack } from './navigation/TemplateStack';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const darkTheme = {
  dark: true,
  colors: {
    primary: '#8B5CF6',
    background: '#1F2937',
    card: '#111827',
    text: '#F3F4F6',
    border: '#374151',
    notification: '#EF4444',
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={darkTheme}>
        <Tab.Navigator
          initialRouteName="DashboardStack"
          screenOptions={{
            tabBarActiveTintColor: '#8B5CF6',
            tabBarInactiveTintColor: '#9CA3AF',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#111827',
              borderTopWidth: 1,
              borderTopColor: '#374151',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
          }}
        >
          <Tab.Screen 
            name="DashboardStack" 
            component={DashboardStack}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📊</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="ClientStack" 
            component={ClientStack}
            options={{
              tabBarLabel: 'Clients',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>👥</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="ProductStack" 
            component={ProductStack}
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📦</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="InvoiceStack" 
            component={InvoiceStack}
            options={{
              tabBarLabel: 'Invoices',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📄</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="TemplateStack" 
            component={TemplateStack}
            options={{
              tabBarLabel: 'Templates',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📋</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
});