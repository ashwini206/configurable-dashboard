import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@layout': '/src/components/layout',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@context': '/src/context',
      '@services': '/src/services',
      '@data': '/src/data',
      '@types': '/src/types',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
    },
  },
})
