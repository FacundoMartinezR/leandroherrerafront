import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import path from 'path'
// import { fileURLToPath } from 'url'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['barber-mentorship.loca.lt'],
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // tu backend
        changeOrigin: true,
        secure: false
      }
    }
  },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
})
