import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "DATABASE_URL= PORT=3101 pnpm nx serve api --host=127.0.0.1",
      url: "http://127.0.0.1:3101/health",
      timeout: 120_000,
      reuseExistingServer: !process.env["CI"],
      env: { DATABASE_URL: "", NODE_OPTIONS: "", PORT: "3101" },
    },
    {
      command:
        "NEXT_PUBLIC_API_URL=http://127.0.0.1:3101 pnpm nx serve web --host=127.0.0.1 --port=3100",
      url: "http://127.0.0.1:3100",
      timeout: 120_000,
      reuseExistingServer: !process.env["CI"],
      env: { NEXT_PUBLIC_API_URL: "http://127.0.0.1:3101" },
    },
  ],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
