import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at https://<user>.github.io/Portfolio-Website/
  // so all asset URLs must be prefixed with the repo name.
  base: '/Portfolio-Website/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
