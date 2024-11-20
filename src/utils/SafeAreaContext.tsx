import React from 'react';
import { View } from 'react-native';

export const SafeAreaProvider = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flex: 1 }}>{children}</View>
);

export const SafeAreaView = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flex: 1 }}>{children}</View>
);

export const useSafeAreaInsets = () => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const useSafeAreaFrame = () => ({
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
});

export const SafeAreaFrameContext = React.createContext(null);
export const SafeAreaInsetsContext = React.createContext(null);
export const initialWindowMetrics = null;