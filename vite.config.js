import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        copyFileSync('CNAME', join('dist', 'CNAME'))
      }
    }
  ],
  base: '/', // For GitHub Pages with custom domain, use '/'
  build: {
    outDir: 'dist',
  },
})

