import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-safe-area-context': path.resolve(__dirname, './src/utils/SafeAreaContext.tsx'),
      'react-native-screens': path.resolve(__dirname, './src/utils/Screens.tsx')
    }
  },
  define: {
    global: 'window',
    __DEV__: true
  },
  optimizeDeps: {
    include: ['react-native-web']
  }
});