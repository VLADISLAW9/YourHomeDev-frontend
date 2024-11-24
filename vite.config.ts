import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import viteReact from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const config = {
    plugins: [viteReact(), TanStackRouterVite()],
    publicDir: 'static',
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/routes': path.resolve(__dirname, './src/routes'),
        '@/generated': path.resolve(__dirname, './generated'),
        '@': path.resolve(__dirname, './')
      }
    }
  };

  return config;
});
