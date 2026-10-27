import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from https://tamalhossain123.github.io/softvence-dashboard/
  base: '/softvence-dashboard/',
})
