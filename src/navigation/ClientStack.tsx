import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const ClientScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#1F2937' }}>
    <Text style={{ color: '#F3F4F6' }}>Clients</Text>
  </View>
);

export function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Clients" 
        component={ClientScreen}
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