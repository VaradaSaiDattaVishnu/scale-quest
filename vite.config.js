import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// In production the app is served from https://<user>.github.io/scale-quest/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/scale-quest/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
}))
