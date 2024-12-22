import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve"; // Import the resolve plugin

// https://vite.dev/config/
export default defineConfig({
  base: "/MediPortal/",
  build: {
    rollupOptions: {
      plugins: [
        resolve(), // Resolves modules from node_modules
        commonjs(), // Converts CommonJS modules to ES6
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
