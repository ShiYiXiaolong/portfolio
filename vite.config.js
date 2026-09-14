import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Custom domain (liunero.com) — keep '/' so GitHub Pages assets resolve at the root
  base: '/',
  build: {
    outDir: 'dist',
  },
})
