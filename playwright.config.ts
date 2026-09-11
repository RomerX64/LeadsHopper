import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "pnpm nx serve api --host=127.0.0.1",
      url: "http://127.0.0.1:3001/health",
      timeout: 120_000,
      reuseExistingServer: !process.env["CI"],
    },
    {
      command: "pnpm nx serve web --host=127.0.0.1",
      url: "http://127.0.0.1:3000",
      timeout: 120_000,
      reuseExistingServer: !process.env["CI"],
    },
  ],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
