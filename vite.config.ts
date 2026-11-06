import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' gera caminhos relativos, o que permite publicar o build
// na raiz de um domínio (Vercel/Netlify) ou em um subcaminho (GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
