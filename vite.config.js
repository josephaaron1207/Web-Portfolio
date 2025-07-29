import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; // Import path for resolving absolute paths if needed

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Ensure Vite knows where your root index.html is if not in standard public dir.
  // In your specific structure, the root of Vite is csp1-vue, and index.html is there.
  // This might not be strictly necessary if it's the default, but good to be explicit.
  root: path.resolve(__dirname), // Sets the project root to the directory containing vite.config.js
  build: {
    // Relative to the root (csp1-vue/)
    outDir: 'dist',
    emptyOutDir: true, // Cleans the output directory before building
  },
  resolve: {
    alias: {
      // Setup an alias for @ pointing to src for easier imports
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Serve static assets from the base directory
  publicDir: 'images', // Specifies that your 'images' folder is where public assets are
                       // this means images will be accessible via /image-name.jpg
})