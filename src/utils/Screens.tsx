import React from 'react';
import { View } from 'react-native';

export const Screen = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flex: 1 }}>{children}</View>
);

export const ScreenContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flex: 1 }}>{children}</View>
);

export const enableScreens = () => {};

export default {
  Screen,
  ScreenContainer,
  enableScreens
};