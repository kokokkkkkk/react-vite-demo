import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginImp()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
