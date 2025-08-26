import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // For a custom domain (roflbox.website) assets should be served from root.
  // Using '/roflbox.website/' caused requests like https://roflbox.website/roflbox.website/assets/*.js
  // which GitHub Pages returns as HTML 404 -> MIME type text/html -> blocked.
  base: '/',
})
