import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/spk-isp-batam/',
  build: {
    outDir: 'dist',
    // Copy file .nojekyll ke dist
    copyPublicDir: true
  },
  publicDir: 'public'
})
