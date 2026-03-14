import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // Use root base during local dev (`/`) so assets load correctly.
    // Use relative base for production so the site works when served from a subpath.
    // (This avoids 404s when opening deployed files via GitHub Pages or similar.)
    base: mode === 'production' ? './' : '/',
    cacheDir: './.vite', // Force local cache to bypass global temp path issues with apostrophes
    server: {
      port: 4000,
      strictPort: false,
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
