import { defineConfig } from "vitest/config";
// @ts-ignore
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
// https://vitejs.dev/config/
// @ts-ignore
export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts", // optional
    },
    server: {
      port: 5173,
    },
    base: env.VITE_BASE,
  });
};
