import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5174, // Only used for local dev
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    },
  },

  // Allow the backend host (hosted on Render) when using `vite preview` locally
  preview: {
    // Add hosts you want to allow; this prevents Vite from blocking external preview requests
    allowedHosts: ['orthodontist-backend.onrender.com']
  },

  build: {
    cssMinify: true,
    cssCodeSplit: true,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    copyPublicDir: true,
    // Ensure index.html and 404.html are handled properly
    emptyOutDir: true
  },
})
