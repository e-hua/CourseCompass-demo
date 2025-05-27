import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://tailwindcss.com/docs/installation/using-vite

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://coursecompass-demo.onrender.com",
        // target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
