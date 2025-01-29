import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base:'./',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true
    }
  };
});