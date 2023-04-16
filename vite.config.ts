import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const isCodeSandbox =
  "SANDBOX_URL" in process.env ||
  "CODESANDBOX_HOST" in process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/r3fgamedemo/",
  publicDir: "public",
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
