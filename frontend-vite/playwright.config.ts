import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: {
    video: "on",
  },
  reporter: process.env.CI ? "list" : "html",
});
