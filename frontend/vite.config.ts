import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tanstackRouter from "@tanstack/router-plugin/vite";
import { unstableRolldownAdapter, analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    unstableRolldownAdapter(analyzer())
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
              return 'vendor';
            }
          }
        }
      }
    }
  }
})
