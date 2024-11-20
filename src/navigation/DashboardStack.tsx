import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const DashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F2937' }}>
    <Text style={{ color: '#F3F4F6', fontSize: 18 }}>Dashboard</Text>
  </View>
);

export function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F3F4F6'
        }}
      />
    </Stack.Navigator>
  );
}