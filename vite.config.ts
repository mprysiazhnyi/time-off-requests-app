import { defineConfig } from "vitest/config";
// @ts-ignore
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // optional
  },
  server: {
    port: 5173,
  },
  base: process.env.VITE_BASE,
});
