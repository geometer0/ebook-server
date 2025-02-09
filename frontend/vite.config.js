import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/pdfs': 'http://localhost:3000'
  //   }
  // }
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        pdfWorker: 'node_modules/pdfjs-dist/build/pdf.worker.mjs'
      }
    }
  }
})
