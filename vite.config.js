import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pgy-ilp-vite/',   // ← 你的 repo 名稱
})


