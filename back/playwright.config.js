import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/E2E",

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
  },
});
