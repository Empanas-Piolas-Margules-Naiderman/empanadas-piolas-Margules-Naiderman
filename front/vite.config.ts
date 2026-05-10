import { defineConfig } from "vite/dist/node";
import react from "@vitejs/plugin-react/dist";
import tailwindcss from "@tailwindcss/vite/dist/index.d.mts";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
