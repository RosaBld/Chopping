// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#004e53',
        icons: [
          {
            src: '/Chopping-logo.svg',
            sizes: '144x144',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: "/Chopping-logo.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
})