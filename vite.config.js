import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run build`          -> dist/          (BrowserRouter, for your PHP host)
// `npm run build:preview`  -> dist-preview/  (HashRouter + relative paths, opens from any folder)
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'preview' ? './' : '/',
  server: { proxy: { '/api': 'http://127.0.0.1:8000' } },
  build: { outDir: mode === 'preview' ? 'dist-preview' : 'dist' },
}))
