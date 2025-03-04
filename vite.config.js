import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config()
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})
