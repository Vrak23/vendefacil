import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  const isVercel = !!process.env.VERCEL;

  return {
    plugins: [react()],
    base: isDev || isVercel ? '/' : '/vendefacil/'
  }
})
