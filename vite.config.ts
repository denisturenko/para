import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    cors: true,
  },
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      app: path.resolve('src/app'),
      entities: path.resolve('src/entities'),
      features: path.resolve('src/features'),
      pages: path.resolve('src/pages'),
      shared: path.resolve('src/shared'),
      widgets: path.resolve('src/widgets'),
    },
  },
});
