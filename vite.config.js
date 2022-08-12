import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'


const baseUrl = {
  development: './',
  beta: './',
  release: './'
}

export default ({ mode }) =>  defineConfig({
  plugins: [
    react(),
  ],
  base: baseUrl[mode],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8991,
      // 是否开启 https
    https: false,
    proxy: {
      '/api': {
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})