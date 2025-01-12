import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true, // Open browser on server start
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Preserve all comments (including the easter egg in index.html)
    minify: {
      preserveComments: true
    }
  },
  // Handle CSS imports
  css: {
    devSourcemap: true
  },
  // Optimize JS modules
  optimizeDeps: {
    include: ['js/main.js']
  }
}); 