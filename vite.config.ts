import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🔧 Substitua 'berry-converter' pelo nome EXATO do seu repositório
export default defineConfig({
  plugins: [react()],
  base: '/conversor-de-berries/', // 👈 Caminho do repositório
})